import { BaseMessage } from './BaseMessage';

export type AddToChatroomMessage = BaseMessage & { chatroomId: string };
