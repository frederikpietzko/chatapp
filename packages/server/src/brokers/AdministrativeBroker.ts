import {
  AddToChatroomMessage,
  BaseMessage,
  Chatroom,
  CreateChatroomMessage,
  MessageType,
} from '@chatapp/common';
import { Socket } from 'socket.io';
import { ChatroomManager } from '../chatroom';
import { BaseBroker } from './BaseBroker';

export class AdministrativeBroker extends BaseBroker {
  private static _instance: AdministrativeBroker;
  public static get instance(): AdministrativeBroker {
    if (!this._instance) {
      this._instance = new AdministrativeBroker();
    }
    return this._instance;
  }

  send(message: BaseMessage, messageType?: MessageType): void {
    for (const { socket } of this.activeSockets) {
      socket.emit(messageType || MessageType.CREATE_CHATROOM, message);
    }
  }

  receive(messageType: MessageType, message: any, socket: Socket): void {
    if (messageType === MessageType.CREATE_CHATROOM) {
      const chatroom = ChatroomManager.instance.createChatroom(
        socket,
        message as CreateChatroomMessage
      );
      this.send(<BaseMessage<Chatroom>>{
        ...message,
        object: {
          name: chatroom.name,
          chatroomId: chatroom.chatroomId,
          ownerUsername: chatroom.ownerUsername,
        },
      });
    }
    if (messageType === MessageType.ADD_TO_CHATROOM) {
      ChatroomManager.instance.addToChatroom(
        (message as AddToChatroomMessage).chatroomId,
        socket,
        (message as AddToChatroomMessage).username
      );
    }
  }
}
