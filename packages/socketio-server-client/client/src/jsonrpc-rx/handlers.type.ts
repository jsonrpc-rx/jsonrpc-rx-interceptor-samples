import { Publisher } from '@jsonrpc-rx/client';

export type Session = {
  name?: string;
  message: string;
};

export type HandlersType = {
  call: {
    getSocketId: () => string;
    broadcast: (session: Session) => void;
    emit: (socketId: string, session: Session) => void;
  };
  subscribe: {
    onsession: (publisher: Publisher<Session>) => () => void;
  };
};
