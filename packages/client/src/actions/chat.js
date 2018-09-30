import axios from "axios"
import to from "await-to-js"
import config from "config"

export function getConversations(number) {
  return new Promise(async (resolve, reject) => {
    let error, response
    ;[error, response] = await to(
      axios.get(`${config.serverUrl}/chat/getAll`, {
        params: { number: number ? number.slice(1) : null },
      }),
    )

    if (error) {
      const errorMessage = getErrorMessage(error)
      reject(errorMessage)
    } else {
      resolve(response.data.conversations)
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
