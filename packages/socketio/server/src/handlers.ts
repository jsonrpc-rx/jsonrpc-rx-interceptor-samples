import { Publisher, asSubject } from "@jsonrpc-rx/server"
import { Server, Socket } from "socket.io"

type HandlersContext = {
  io: Server
  socket: Socket
}

type Session = {
  name?: string
  message: string
}

const broadcastPublishers = new Map<string, Publisher<Session>>()

export const getHandlers = (context: HandlersContext) => {
  const { io, socket } = context
  return {
    getSocketId: () => socket.id,
    broadcast: (session: Session) => {
      for (const [socketId, publisher] of broadcastPublishers.entries()) {
        if (socket.id != socketId)
          publisher.next({
            name: session.name ?? socket.id,
            message: session.message,
          })
      }
    },
    emit: (socketId: string, session: Session) => {
      const publisher = broadcastPublishers.get(socketId)
      if (publisher) {
        publisher.next({
          name: session.name ?? socket.id,
          message: session.message,
        })
      }
    },
    onsession: asSubject((publisher: Publisher<Session>) => {
      broadcastPublishers.set(socket.id, publisher)
      return () => {
        broadcastPublishers.delete(socket.id)
      }
    }),
  }
}
