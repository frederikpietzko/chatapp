import { BaseMessage, MessageType } from '@chatapp/common';
import { BaseBroker } from './BaseBroker';

export class ChatroomBroker extends BaseBroker {
  constructor() {
    super();
  }

  send(message: BaseMessage, messageType?: MessageType): void {
    for (const { socket } of this.activeSockets) {
      socket.emit(messageType || MessageType.CHATROOM_MESSAGE, message);
    }
  }
  receive(messageType: MessageType, message: BaseMessage): void {
    if (messageType === MessageType.CHATROOM_MESSAGE) {
      this.send(message);
    }
  }
}
