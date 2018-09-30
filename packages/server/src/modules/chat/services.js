import twilio from "twilio"

export function sendText(message, sender, user, sid) {
  const twilioClient = new twilio(sid, process.env.TWILIO_AUTH_TOKEN)
  twilioClient.messages.create({
    body: `${message}`,
    to: `${sender}`, // Text this number
    from: `${user}`, // From a valid Twilio number
  })
}
