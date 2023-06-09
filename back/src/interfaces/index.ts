export * from './admin';
export * from './user';

export interface ServerMessage {
  success?: boolean,
  error?: boolean,
  message: string,
}