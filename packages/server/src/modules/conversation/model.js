import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
  author: String,
  body: String,
  translation: String,
  timestamp: Number,
})

const ConversationSchema = new mongoose.Schema({
  user: String,
  userLanguage: String,
  sender: String,
  senderLanguage: String,
  messages: [MessageSchema],
})

const Message = mongoose.model("Message", MessageSchema)
const Conversation = mongoose.model("Conversation", ConversationSchema)

export { Message, Conversation }
export default Conversation
