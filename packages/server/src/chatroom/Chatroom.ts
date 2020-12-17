import { BaseMessage, Chatroom as CommonChatroom } from '@chatapp/common';
import { Socket } from 'socket.io';
import { ChatroomBroker } from '../brokers';
import { MessageHandler } from '../messageHandlers';
import { v4 as uuid } from 'uuid';

export class Chatroom implements CommonChatroom {
  readonly name: string;
  readonly chatroomId: string;
  readonly ownerUsername: string;

  constructor(
    private chatroomBroker: ChatroomBroker,
    private messageHandler: MessageHandler,
    name: string,
    ownerUsername: string
  ) {
    this.name = name;
    this.ownerUsername = ownerUsername;
    this.chatroomId = uuid();
  }

  addToChatroom(socket: Socket, username: string) {
    this.chatroomBroker.registerSocket(
      socket,
      this.messageHandler.copyWith({ socket })
    );
    this.chatroomBroker.send(<BaseMessage>{
      username,
      message: `${username} joined the Chatroom.`,
      date: new Date(),
    });
  }
}
