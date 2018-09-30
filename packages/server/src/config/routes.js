import express from "express"
import userRouter from "modules/user/router"
import twilioRouter from "modules/twilio/router"

const router = express.Router()

router.get("/ping", (req, res) => {
  res.status(200).send({})
})

router.use("/user", userRouter)
router.use("/twilio", twilioRouter)

export default router
