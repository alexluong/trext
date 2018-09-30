// Config
import config from "config"
import "config/database"

import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"
import http from "http"
import routes from "config/routes"
import SocketIO from "socket.io"

const app = express()
const server = http.Server(app)
const io = SocketIO(server)

io.on("connection", () => {
  console.log("a user is connected")
})

// App Setup
app.use(morgan("combined"))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: "*/*", limit: "200mb" }))
app.use("/", routes)

// Server Setup
const port = config.port
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

export default server
export { io }
