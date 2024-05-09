import { JsonrpcServer, expose, asSubject, Publisher } from '@jsonrpc-rx/server';

// the message sender
const msgSender = (msg) => self.postMessage(msg);
// the message receiver
const msgReceiver = (h) => (self.onmessage = (e) => h(e.data));
// create jsonrpcServer
const jsonrpcServer = new JsonrpcServer(msgSender, msgReceiver);

const handlers = {
  // a callable method
  sum: (a: number, b: number) => a + b,
  // an observable subject
  timer: asSubject(({ next }: Publisher<number>) => {
    let a = 0;
    const interval = setInterval(() => next(++a), 1000);
    return () => clearInterval(interval);
  }),
};

// expose handlers
expose(jsonrpcServer, handlers);

export type HandlersType = typeof handlers;
