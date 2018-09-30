import express from "express"
import * as controllers from "./controllers"
const router = express.Router()

// POST /chat/receive
router.post("/receive", controllers.receive)

// POST /chat/send
router.post("/send", controllers.send)

export default router
