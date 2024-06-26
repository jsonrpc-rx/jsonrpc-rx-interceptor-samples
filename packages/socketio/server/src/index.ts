import "dotenv/config"
import express from "express"
import { createServer } from "http"
import { SocketIOServer } from "./socketio-server"

export function main() {
  const app = express()
  const server = createServer(app)

  new SocketIOServer(server)

  server.listen(3000, () => {
    console.log("server running at http://localhost:3000")
  })
}

main()
