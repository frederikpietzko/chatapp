import { BaseMessage } from './BaseMessage';

export type CreateChatroomMessage = BaseMessage & {
  chatroomName: string;
};
