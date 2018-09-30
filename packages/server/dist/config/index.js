"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const config = {}; // HTTP Port to run our web application

config.port = process.env.PORT; // A random string that will help generate secure one-time passwords and
// HTTP sessions

config.jwtSecret = process.env.JWT_SECRET; // Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account

config.accountSid = process.env.TWILIO_ACCOUNT_SID;
config.authToken = process.env.TWILIO_AUTH_TOKEN; // A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"

config.twilioNumber = process.env.TWILIO_NUMBER; // Your Authy production key - this can be found on the dashboard for your
// Authy application

config.authyKey = process.env.AUTHY_API_KEY; // MongoDB connection string - MONGO_URL is for local dev,
// MONGODB_URI is for the MongoLab add-on for Heroku deployment
// when using docker-compose

config.databaseUrl = process.env.DB_URL; // Export configuration object

var _default = config;
exports.default = _default;