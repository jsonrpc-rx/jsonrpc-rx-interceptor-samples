import { JsonrpcClient, MessageSender, MessageReceiver, wrap } from '@jsonrpc-rx/client';
import { asyncFuncParamsInterceptor } from '@jsonrpc-rx/async-func-params-interceptor';
import { HandlersType } from './handlers.type';
import { useSocket } from '../socket/hooks';
import { useMemo } from 'react';

const CHANNEL_MESSAGE = 'channel:message';

export const useJsonrpcClient = () => {
  const socket = useSocket();

  return useMemo(() => {
    const messageSender: MessageSender = (data: string) => socket!.emit(CHANNEL_MESSAGE, data);
    const messageReceiver: MessageReceiver = (handler) => socket!.on(CHANNEL_MESSAGE, handler);
    const jsonrpcClient = new JsonrpcClient(messageSender, messageReceiver, {
      interceptors: [asyncFuncParamsInterceptor as any],
    });

    return wrap<HandlersType>(jsonrpcClient);
  }, [socket]);
};
