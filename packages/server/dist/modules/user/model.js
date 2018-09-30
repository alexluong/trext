"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../../config"));

var _authy = _interopRequireDefault(require("authy"));

var _twilio = _interopRequireDefault(require("twilio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const authy = (0, _authy.default)(_config.default.authyKey);
const twilioClient = (0, _twilio.default)(_config.default.accountSid, _config.default.authToken); // Used to generate password hash

const SALT_WORK_FACTOR = 10; // Define user model schema

const UserSchema = new _mongoose.default.Schema({
  fullName: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  authyId: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sid: {
    type: String
  }
}); // Middleware executed before save - hash the user's password

UserSchema.pre("save", function (next) {
  const self = this; // only hash the password if it has been modified (or is new)

  if (!self.isModified("password")) return next(); // generate a salt

  _bcrypt.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err); // hash the password using our new salt

    _bcrypt.default.hash(self.password, salt, function (err, hash) {
      if (err) return next(err); // override the cleartext password with the hashed one

      self.password = hash;
      next();
    });
  });
}); // Test candidate password

UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise(resolve => {
    const self = this;

    _bcrypt.default.compare(candidatePassword, self.password, function (err, isMatch) {
      if (err) return resolve(false);
      resolve(isMatch);
    });
  });
}; // Send a verification token to this user


UserSchema.methods.sendAuthyToken = function () {
  return new Promise((resolve, reject) => {
    let self = this;

    if (!self.authyId) {
      // Register this user if it's a new user
      authy.register_user(self.email, self.phone, self.countryCode, function (err, response) {
        if (err || !response.user) return reject(err);
        self.authyId = response.user.id;
        self.save(function (err, doc) {
          if (err || !doc) return reject(err);
          self = doc;
          sendToken(self.authyId);
        });
      });
    } else {
      // Otherwise send token to a known user
      sendToken(self.authyId);
    } // With a valid Authy ID, send the 2FA token for this user


    function sendToken(authyId) {
      authy.request_sms(authyId, true, function (err, response) {
        if (err) reject(err);
        resolve();
      });
    }
  });
}; // Test a 2FA token


UserSchema.methods.verifyAuthyToken = function (otp) {
  return new Promise((resolve, reject) => {
    const self = this;
    authy.verify(self.authyId, otp, function (error, response) {
      if (error) reject(error);
      resolve(response);
    });
  });
}; // Send a text message via twilio to this user


UserSchema.methods.sendMessage =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(function* (message) {
    const self = this;
    const toNumber = `+${self.countryCode}${self.phone}`;
    yield twilioClient.messages.create({
      to: toNumber,
      from: _config.default.twilioNumber,
      body: message
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}(); // Export user model


module.exports = _mongoose.default.model("User", UserSchema);