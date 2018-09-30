import twilio from 'twilio'
 
export function sendText(message, sender, user, sid, auth) {
  console.log(message, 'to',sender,'from', user)
  const twilioClient = new twilio(sid, auth);
  twilioClient.messages.create({
      body: `${message}`,
      to: `${sender}`,  // Text this number
      from: `${user}` // From a valid Twilio number
  })
}