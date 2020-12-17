import { MessageType } from '@chatapp/common';
import { Socket } from 'socket.io';
import { AdministrativeBroker, AllChatBroker } from '../brokers';
import { MessageHandler } from './MessageHandler';

const allChatBroker = AllChatBroker.instance;
const adminBroker = AdministrativeBroker.instance;

const ALL_CHAT_MESSAGE_TYPES = [MessageType.MESSAGE_TO_ALL];
const ADMIN_MESSAGE_TYPES = [
  MessageType.ADD_TO_CHATROOM,
  MessageType.CREATE_CHATROOM,
];

const createAllChatMessageHandler = (socket: Socket) => {
  console.log('All Chat Message Handler');
  const messageHandler = new MessageHandler({
    broker: allChatBroker,
    handeledMessageTypes: ALL_CHAT_MESSAGE_TYPES,
    socket,
  });
  allChatBroker.registerSocket(socket, messageHandler);
};

const createAdminMessageHandler = (socket: Socket) => {
  console.log('Admin Message Handler');
  const messageHandler = new MessageHandler({
    broker: adminBroker,
    handeledMessageTypes: ADMIN_MESSAGE_TYPES,
    socket,
  });
  adminBroker.registerSocket(socket, messageHandler);
};

const SETUP_FUNCTIONS = [
  createAdminMessageHandler,
  createAllChatMessageHandler,
];

type BaseMessageHandlers = 'AllChatMessageHandler' | 'AdminMessageHandler';

export const setupBaseMessageHandlers = (
  baseMessageHandlers?: BaseMessageHandlers[]
) => (socket: Socket) => {
  if (!baseMessageHandlers) {
    for (const messageHanderSetup of SETUP_FUNCTIONS) {
      messageHanderSetup(socket);
    }
  }
};
