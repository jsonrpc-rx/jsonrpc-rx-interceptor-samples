import { JsonrpcServer, expose, asSubject, Publisher, asNotify, asBehaviorSubject } from '@jsonrpc-rx/server';

const msgSender = (msg) => self.postMessage(msg);
const msgReceiver = (h) => (self.onmessage = (e) => h(e.data));
const jsonrpcServer = new JsonrpcServer(msgSender, msgReceiver);

const handlers = {
  sum: (a: number, b: number) => a + b,
  hello: asNotify((who: string) => {
    console.log('hello ', who);
  }),
  useAlert: (alert: (message?: any) => void) => {
    setTimeout(() => alert('hello jsonrpc-rx !'), 5000);
  },
  timer: asSubject(({ next }: Publisher<number>) => {
    let a = 0;
    const interval = setInterval(() => next(++a), 1000);
    return () => clearInterval(interval);
  }),
  behaviorTimer: asBehaviorSubject(({ next }: Publisher<number>) => {
    let a = 0;
    const interval = setInterval(() => next(++a), 1000);
    return () => clearInterval(interval);
  }, 0),
};

expose(jsonrpcServer, handlers);

export type HandlersType = typeof handlers;
