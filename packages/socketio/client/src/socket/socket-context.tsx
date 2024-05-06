import { createContext } from 'react';
import { io, type Socket } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  transports: ['websocket'],
});
socket.connect();
socket.on('connect', () => {
  console.log('Socket connected');
});
socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

export const SocketContext = createContext<Socket>(socket);

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
