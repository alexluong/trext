import axios from "axios"
import to from "await-to-js"
import config from "config"

export function getPhoneNumbers(areaCode) {
  return new Promise(async (resolve, reject) => {
    let error, response
    ;[error, response] = await to(
      axios.post(`${config.serverUrl}/twilio/get-phone-numbers`, { areaCode }),
    )

    if (error) {
      const errorMessage = getErrorMessage(error)
      reject(errorMessage)
    } else {
      resolve(response.data.phoneNumbers)
    }
  })
}

export function createUserTwilio(language, twilioNumber, userID) {
  return new Promise(async (resolve, reject) => {
    let error, response
    ;[error, response] = await to(
      axios.post(`${config.serverUrl}/twilio/create-user-twilio`, {
        language,
        twilioNumber,
        userID,
      }),
    )

    if (error) {
      const errorMessage = getErrorMessage(error)
      reject(errorMessage)
    } else {
      resolve(response.data.user)
    }
  })
}

function getErrorMessage(error) {
  let errorMessage
  try {
    errorMessage = error.response.data.message || error.message
  } catch (error) {
    errorMessage = error.message
  }
  return errorMessage
}
