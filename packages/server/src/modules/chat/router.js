import express from "express"
import * as controllers from "./controllers"
const router = express.Router()

// POST /chat/sign-in
router.post("/twilio", controllers.twilio)

export default router
