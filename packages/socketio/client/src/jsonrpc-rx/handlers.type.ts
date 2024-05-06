import { Observable, Publisher } from '@jsonrpc-rx/client';

export type Session = {
  name?: string;
  message: string;
};

export type HandlersType = {
  getSocketId: () => string;
  broadcast: (session: Session) => void;
  emit: (socketId: string, session: Session) => void;
  onsession: Observable<(publisher: Publisher<Session>) => () => void>;
};
