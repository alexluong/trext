import express from "express"
import * as controllers from "./controllers"
const router = express.Router()

// POST /twilio/get-phone-numbers
router.post("/get-phone-numbers", controllers.getPhoneNumbers)

// POST /twilio/create-user-twilio
router.post("/create-user-twilio", controllers.createUserTwilio)

// POST /twilio/send-message
router.post("/send-message", controllers.sendMessage)

export default router
