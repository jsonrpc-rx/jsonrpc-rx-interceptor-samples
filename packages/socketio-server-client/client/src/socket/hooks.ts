import { useContext } from 'react';
import { SocketContext } from './socket-context';

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
