import express from "express"
import * as controllers from "./controllers"
const router = express.Router()

// POST /chat/receive
router.post("/receive", controllers.receive)

// GET /chat/getAll
router.get("/getAll", controllers.getAll)

export default router
