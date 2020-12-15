import { BaseMessage, MessageType } from '@chatapp/common';
import { Socket } from 'socket.io';
import { BaseBroker } from 'src/brokers/BaseBroker';

export interface MessageHandlerConfig {
  socket: Socket;
  broker: BaseBroker;
  handeledMessageTypes: MessageType[];
}

export class MessageHandler {
  constructor(config: MessageHandlerConfig) {
    for (const messageType of config.handeledMessageTypes) {
      config.socket.on(messageType.toString(), (message: BaseMessage) =>
        config.broker.receive(messageType, message, config.socket)
      );
    }
  }
}
