import { JsonrpcServer, expose, MessageSender, MessageReceiver } from '@jsonrpc-rx/server';
import { handlers } from './handlers';

const messageSender: MessageSender = (msg) => self.postMessage(msg);
const messageReceiver: MessageReceiver = (handler) => self.addEventListener('message', (evt) => handler(evt.data));
const jsonrpcServer = new JsonrpcServer(messageSender, messageReceiver);

expose(jsonrpcServer, handlers);
