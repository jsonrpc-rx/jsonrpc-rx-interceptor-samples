import { JsonrpcServer as JsonrpcServerEnd, MessageReceiver, MessageSender, expose } from '@jsonrpc-rx/server';
import { Server, Socket } from 'socket.io';
import { getHandlers } from '../handlers';
import { logInterceptor } from './log-interceptor';

const CHANNEL_MESSAGE = 'channel:message';

export class JsonrpcServer {
  constructor(io: Server, socket: Socket) {
    const messageSender: MessageSender = (data: string) => socket!.emit(CHANNEL_MESSAGE, data);
    const messageReceiver: MessageReceiver = (handler) => socket!.on(CHANNEL_MESSAGE, handler);
    const jsonrpcServer = new JsonrpcServerEnd(messageSender, messageReceiver, { interceptors: [logInterceptor] });

    expose(jsonrpcServer, getHandlers({ io, socket }));
  }
}
