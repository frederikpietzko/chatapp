import {
  AddToChatroomMessage,
  BaseMessage,
  Chatroom,
  MessageType,
} from '@chatapp/common';
import React, { useEffect, useState } from 'react';
import { socket } from '../services';

export const Chatrooms: React.FC = () => {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  useEffect(() => {
    socket.on(MessageType.CREATE_CHATROOM, (message: BaseMessage<Chatroom>) => {
      if (message.object) {
        setChatrooms((chatrooms) => [...chatrooms, message.object!]);
      }
    });
  }, []);
  const handleJoin = (chatroom: Chatroom) => () => {
    socket.emit(MessageType.ADD_TO_CHATROOM, {
      username: 'Freddy',
      chatroomId: chatroom.chatroomId,
      message: 'Add Me To Chatroom',
      date: new Date(),
    } as AddToChatroomMessage);
  };

  return (
    <ul>
      {chatrooms.map((chatroom) => (
        <li key={chatroom.chatroomId}>
          {chatroom.name}{' '}
          <button onClick={handleJoin(chatroom)} type="button">
            Join
          </button>
        </li>
      ))}
    </ul>
  );
};
