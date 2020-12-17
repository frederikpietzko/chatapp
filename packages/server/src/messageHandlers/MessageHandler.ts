import { BaseMessage, MessageType } from '@chatapp/common';
import { Socket } from 'socket.io';
import { BaseBroker } from 'src/brokers/BaseBroker';

export interface MessageHandlerConfig {
  socket: Socket;
  broker: BaseBroker;
  handeledMessageTypes: MessageType[];
}

interface OptionalMessageHandlerConfig {
  socket?: Socket;
  broker?: BaseBroker;
  handeledMessageTypes?: MessageType[];
}

export class MessageHandler {
  constructor(private config: MessageHandlerConfig) {
    for (const messageType of config.handeledMessageTypes) {
      this.config.socket.on(messageType.toString(), (message: BaseMessage) =>
        this.config.broker.receive(messageType, message, this.config.socket)
      );
    }
  }

  copyWith(config: OptionalMessageHandlerConfig) {
    return new MessageHandler({ ...this.config, ...config });
  }
}
