import { BaseMessage, MessageType } from '@chatapp/common';
import { BaseBroker } from './BaseBroker';

export class AllChatBroker extends BaseBroker {
  private static _instance: AllChatBroker;
  public static get instance(): AllChatBroker {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new AllChatBroker();
    return this._instance;
  }

  protected constructor() {
    super();
  }

  send(message: BaseMessage): void {
    for (const { socket } of this.activeSockets) {
      socket.emit(MessageType.MESSAGE_TO_ALL, message);
    }
  }

  receive(messageType: MessageType, message: BaseMessage): void {
    if (messageType === MessageType.MESSAGE_TO_ALL) {
      this.send(message);
    }
  }
}
