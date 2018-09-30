import to from "await-to-js"
import { translate } from "modules/translation/services"
import User from "modules/user/model"
import { Conversation, Message } from "modules/conversation/model"
import { io } from "index"

export async function receive(req, res) {
  const textMessage = req.body.Body
  const fromNumber = req.body.From
  const toNumber = req.body.To
  const timestamp = new Date().getTime()

  let error, user
  ;[error, user] = await to(User.findOne({ twilioNumber: toNumber }))

  if (error || !user) return res.sendStatus(404)
  else {
    const result = await translate(textMessage, user.language)
    if (result.error) return res.sendStatus(400)

    let conversation
    ;[error, conversation] = await to(
      Conversation.findOne({ user: toNumber, sender: fromNumber }),
    )
    if (error) return res.sendStatus(404)
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
    if (error) return res.sendStatus(500)

    io.emit("NEW_MESSAGE", message)
    res.sendStatus(200)
  }
}

export async function getAll(req, res) {
  let error, conversations
  ;[error, conversations] = await to(
    Conversation.find({ user: `+${req.query.number}` }),
  )
  console.log(conversations)
  if (error) return res.status(500).send({ message: "Server error." })
  else if (!conversations) return res.status(200).send({ conversations: [] })
  else return res.status(200).send({ conversations })
}
