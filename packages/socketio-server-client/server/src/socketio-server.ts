import { Server as HTTPServer } from "http"
import { Server as SocketServer } from "socket.io"
import { JsonrpcRxServer } from "./jsonrpc-rx-server"

export class SocketIOServer {
  private io: SocketServer

  constructor(httpServer: HTTPServer) {
    this.io = new SocketServer(httpServer)

    this.io.on("connection", (socket) => {
      console.log("user connected, socket id:", socket.id)

      new JsonrpcRxServer(this.io, socket)

      socket.on("disconnect", () => {
        console.log("user disconnected, socket id:", socket.id)
      })
    })
  }
}
