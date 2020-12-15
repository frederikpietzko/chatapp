import { BaseMessage } from './BaseMessage';

export type ChatroomMessage = BaseMessage & {
  chatroomId: string;
};
