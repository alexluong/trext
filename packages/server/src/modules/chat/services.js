import { twilioClient } from "index"
 
export function sendText(message, sender, user) {
  console.log(message, sender, user)
  twilioClient.messages.create({
      body: `${message}`,
      to: `${sender}`,  // Text this number
      from: `${user}` // From a valid Twilio number
  })
}