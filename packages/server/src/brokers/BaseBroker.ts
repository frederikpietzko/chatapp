import { BaseMessage, MessageType } from '@chatapp/common';
import { Socket } from 'socket.io';
import { MessageHandler } from '../messageHandlers';

type ActiveSocket = {
  socket: Socket;
  messageHandler: MessageHandler;
};

export abstract class BaseBroker {
  protected activeSockets: ActiveSocket[];

  protected constructor() {
    this.activeSockets = [];
  }

  disconnectSocket(socket: Socket) {
    socket.disconnect();
    this.activeSockets = this.activeSockets.filter(
      (s) => s.socket.id !== socket.id
    );
  }

  registerSocket(socket: Socket, messageHandler: MessageHandler) {
    this.activeSockets.push({ socket, messageHandler });
    socket.on('disconnect', () => this.disconnectSocket(socket));
  }

  abstract send(message: BaseMessage): void;

  abstract receive(
    messageType: MessageType,
    message: BaseMessage,
    socket?: Socket
  ): void;
}
