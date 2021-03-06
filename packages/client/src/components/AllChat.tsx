import { BaseMessage, MessageType } from '@chatapp/common';
import React, { useEffect, useState } from 'react';
import { socket } from '../services';

export const AllChat: React.FC = () => {
  const [messages, setMessages] = useState<BaseMessage[]>([]);
  const [message, setMessage] = useState('');

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(MessageType.MESSAGE_TO_ALL.toString(), {
      message,
      username: 'Freddy',
      date: new Date(),
    } as BaseMessage);
  };

  useEffect(() => {
    socket.on(MessageType.MESSAGE_TO_ALL, (message: BaseMessage) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div>{`${message.username}: ${message.message} at ${
          message.date || new Date()
        }`}</div>
      ))}

      <br />
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
