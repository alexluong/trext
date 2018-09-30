import to from "await-to-js"
import { translate } from "modules/translation/services"
import User from "modules/user/model"
import { Conversation, Message } from "modules/conversation/model"
import { io } from "index"

export async function twilio(req, res) {
  const textMessage = req.body.Body
  const fromNumber = req.body.From
  const toNumber = req.body.To
  const timestamp = new Date().getTime()

  let error, user
  ;[error, user] = await to(User.findOne({ twilioNumber: toNumber }))

  if (error || !user) res.sendStatus(404)
  else {
    const result = await translate(textMessage, user.language)
    if (result.error) res.sendStatus(400)

    let conversation
    ;[error, conversation] = await to(
      User.findOne({ user: toNumber, send: fromNumber }),
    )
    if (error) res.sendStatus(404)
    if (!conversation) {
      conversation = new Conversation({
        user: toNumber,
        userLanguage: user.language,
        sender: fromNumber,
        senderLanguage: result.detect.language,
        messages: [],
      })
    }

    const message = new Message({
      author: fromNumber,
      body: textMessage,
      translation: result.translation,
      timestamp,
    })

    conversation.messages = [message, ...conversation.messages]
    ;[error] = await to(conversation.save())
    if (error) res.sendStatus(500)

    io.emit("NEW_MESSAGE", message)
    res.sendStatus(200)
  }
}

export async function send(req, res) {

  res.sendStatus(200)
}
