import { BaseMessage } from './BaseMessage';

export type AddToChatroomMessage<T = {}> = BaseMessage<T> & {
  chatroomId: string;
};
