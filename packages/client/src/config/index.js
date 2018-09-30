const config = {}

console.log(process.env.NODE_ENV)
config.serverUrl =
  process.env.NODE_ENV === "production"
    ? "https://trext-prod.appspot.com"
    : "http://localhost:8000"

export default config
