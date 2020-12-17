import {
  CreateChatroomMessage,
  ErrorMessage,
  MessageType,
} from '@chatapp/common';
import { Socket } from 'socket.io';
import { MessageHandler } from '../messageHandlers';
import { ChatroomBroker } from '../brokers';
import { Chatroom } from './Chatroom';
import _ from 'lodash';

export class ChatroomManager {
  private constructor() {}

  private static _instance: ChatroomManager;
  public static get instance(): ChatroomManager {
    if (!this._instance) {
      this._instance = new ChatroomManager();
    }
    return this._instance;
  }

  private _activeChatrooms: Chatroom[] = [];

  public get activeChatroom(): Chatroom[] {
    return this._activeChatrooms;
  }

  public createChatroom(
    socket: Socket,
    message: CreateChatroomMessage
  ): Chatroom {
    const chatroomBroker = new ChatroomBroker();
    const messageHandler = new MessageHandler({
      broker: chatroomBroker,
      handeledMessageTypes: [MessageType.CHATROOM_MESSAGE],
      socket,
    });
    const chatroom = new Chatroom(
      chatroomBroker,
      messageHandler,
      message.chatroomName,
      message.username
    );
    this._activeChatrooms.push(chatroom);
    return chatroom;
  }

  public removeChatroom(chatroomId: string): void {
    this._activeChatrooms = this._activeChatrooms.filter(
      (chatroom) => chatroom.chatroomId !== chatroomId
    );
  }

  public addToChatroom(chatroomId: string, socket: Socket, username: string) {
    const chatroom = this._activeChatrooms.find(
      (chatroom) => chatroomId === chatroom.chatroomId
    );
    if (!chatroom) {
      socket.emit(MessageType.ERROR, {
        message: 'Chatroom does not exist.',
      } as ErrorMessage);
    }
    chatroom!.addToChatroom(socket, username);
    return chatroom;
  }
}
