import { Translate } from "@google-cloud/translate"
import config from "config"

const translation = new Translate({ projectId: config.translateProjectId })

export function translate(message, lang) {
  return new Promise(resolve => {
    const detectPromise = translation.detect(message)
    const translatePromise = translation.translate(message, lang)

    Promise.all([detectPromise, translatePromise])
      .then(([detectRes, translateRes]) => {
        resolve({
          translation: translateRes[0],
          detect: detectRes[0],
          error: "",
        })
      })
      .catch(error => {
        resolve({ translation: "", detect: "", error: "Error translating." })
      })
  })

  // .then(results => resolve({ translation: results[0], error: "" }))
  // .catch(error => resolve({ translation: "", error: "Error translating." }))
}
