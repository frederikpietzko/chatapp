import { BaseMessage } from './BaseMessage';

export type ChatroomMessage<T = {}> = BaseMessage<T> & {
  chatroomId: string;
  chatroomName: string;
};
