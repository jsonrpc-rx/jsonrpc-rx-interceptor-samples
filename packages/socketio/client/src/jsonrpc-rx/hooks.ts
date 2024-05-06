import { JsonrpcClient, MessageSender, MessageReceiver, wrap } from '@jsonrpc-rx/client';
import { HandlersType } from './handlers.type';
import { useSocket } from '../socket/hooks';
import { useMemo } from 'react';

const CHANNEL_MESSAGE = 'channel:message';

export const useJsonrpcClient = () => {
  const socket = useSocket();

  return useMemo(() => {
    const messageSender: MessageSender = (data: string) => socket!.emit(CHANNEL_MESSAGE, data);
    const messageReceiver: MessageReceiver = (handler) => socket!.on(CHANNEL_MESSAGE, handler);
    const jsonrpcClient = new JsonrpcClient(messageSender, messageReceiver);

    return wrap<HandlersType>(jsonrpcClient);
  }, [socket]);
};
