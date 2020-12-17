import { CreateChatroomMessage, MessageType } from '@chatapp/common';
import React, { useState } from 'react';
import { socket } from '../services';

export const CreateChatroom: React.FC = () => {
  const [chatroomName, setChatroomName] = useState('');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(MessageType.CREATE_CHATROOM, {
      chatroomName,
      message: chatroomName,
      username: 'Freddy',
      date: new Date(),
    } as CreateChatroomMessage);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={chatroomName}
        onChange={(e) => setChatroomName(e.target.value)}
        placeholder="Chatroom name"
      />
      <button type="submit">Create chatroom</button>
    </form>
  );
};
