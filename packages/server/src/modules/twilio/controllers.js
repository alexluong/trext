const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require("twilio")(accountSid, authToken)

import User from "../user/model"

import to from "await-to-js"
import config from "config"

export async function getPhoneNumbers(req, res) {
  const { areaCode } = req.body

  let error, phoneNumbers, user

  try {
    phoneNumbers = await client.availablePhoneNumbers("US").local.list({
      areaCode: areaCode,
    })
  } catch (error) {
    return res.status(400).send({ error: error })
  }

  // ;[error, phoneNumbers] = await to(
  //   client.availablePhoneNumbers("US").local.list({
  //     areaCode: areaCode,
  //   }),
  // )

  if (phoneNumbers) {
    // for (phoneNumber in phoneNumbers) {
    //   if (phoneNumber.capabilities["voice"] && phoneNumber.capabilities["SMS"])
    //     phoneNumbers[phoneNumber.friendlyName] = phoneNumber.phoneNumber
    // }
    phoneNumbers = phoneNumbers.map(phoneNumber => {
      return phoneNumber.phoneNumber
    })
    return res.status(200).send({ phoneNumbers: phoneNumbers })
  }
}

export async function createUserTwilio(req, res) {
  const { language, twilioNumber, userID } = req.body

  let error, existingUser, twilioUser

  try {
    existingUser = await User.findById(userID)

    twilioUser = await client.api.accounts.create({
      friendlyName: existingUser.fullName,
    })

    existingUser.sid = twilioUser.sid
    existingUser.authToken = twilioUser.authToken
    existingUser.language = language
    existingUser.twilioNumber = twilioNumber

    await existingUser.save()

    return res.status(200).send({ updatedUser: existingUser })
  } catch (error) {
    return res.status(400).send({ error: error })
  }
}

export async function sendMessage(req, res) {}

// var i
// for (i = 0; i < phoneNumbers.length; i++) {
//   if (
//     phoneNumbers[i].capabilities["voice"] == true &&
//     phoneNumbers[i].capabilities["SMS"] == true
//   ) {
//     phoneNumbers[phoneNumbers[i].friendlyName] = phoneNumbers[i].phoneNumber
//   }
// }

// existingUser.sid = twilioUser.sid,
// existingUser.authToken = twilioUser.authToken,
// existingUser.language = language,
// existingUser.twilioNumber = twilioNumber,

// var newUser = await User.findOneAndUpdate(
//   { _id: userID },
//   { $set: { sid: twilioUser.sid } },
//   { new: true },
// )

// existingUser = await existingUser.save()
// existingUser = await User.findByIdAndUpdate(
//   userID,
//   {
//     sid: twilioUser.sid,
//     authToken: twilioUser.authToken,
//     language: language,
//     twilioNumber: twilioNumber,
//   },
//   { new: true },
// )
