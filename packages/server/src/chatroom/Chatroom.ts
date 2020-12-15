import { Chatroom as CommonChatroom } from '@chatapp/common';
import { ChatroomBroker } from '../brokers';
import { MessageHandler } from '../messageHandlers';

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
  }
}
