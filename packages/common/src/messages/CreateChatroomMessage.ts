import { BaseMessage } from './BaseMessage';

export type CreateChatroomMessage<T = {}> = BaseMessage<T> & {
  chatroomName: string;
};
