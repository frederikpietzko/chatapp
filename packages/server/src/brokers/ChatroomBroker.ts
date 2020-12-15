import { BaseMessage, MessageType } from '@chatapp/common';
import { BaseBroker } from './BaseBroker';

export class ChatroomBroker extends BaseBroker {
  constructor() {
    super();
  }

  send(message: BaseMessage): void {
    throw new Error('Method not implemented.');
  }
  receive(messageType: MessageType, message: BaseMessage): void {
    throw new Error('Method not implemented.');
  }
}
