export type BaseMessage<T = {}> = {
  username: string;
  message: string;
  date?: Date;
  object?: T;
};
