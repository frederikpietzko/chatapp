import {
  AddToChatroomMessage,
  CreateChatroomMessage,
  MessageType,
} from '@chatapp/common';
import { Socket } from 'socket.io';
import { ChatroomManager } from 'src/chatroom';
import { BaseBroker } from './BaseBroker';

export class AdministrativeBroker extends BaseBroker {
  private static _instance: AdministrativeBroker;
  public static get instance(): AdministrativeBroker {
    if (!this._instance) {
      this._instance = new AdministrativeBroker();
    }
    return this._instance;
  }

  send(_: CreateChatroomMessage): void {
    throw new Error('Method not implemented.');
  }

  receive(messageType: MessageType, message: any, socket: Socket): void {
    if (messageType === MessageType.CREATE_CHATROOM) {
      ChatroomManager.instance.createChatroom(
        socket,
        message as CreateChatroomMessage
      );
    }
    if (messageType === MessageType.ADD_TO_CHATROOM) {
      ChatroomManager.instance.addToChatroom(
        (message as AddToChatroomMessage).chatroomId,
        socket
      );
    }
  }
}
