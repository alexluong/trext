"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPhoneNumbers = getPhoneNumbers;
exports.createUserTwilio = createUserTwilio;
exports.sendMessage = sendMessage;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

function getPhoneNumbers(_x, _x2) {
  return _getPhoneNumbers.apply(this, arguments);
}

function _getPhoneNumbers() {
  _getPhoneNumbers = _asyncToGenerator(function* (req, res) {
    const {
      areaCode
    } = req.body;
    let error, phoneNumbers;
    [error, phoneNumbers] = yield client.availablePhoneNumbers("US").local.list({
      areaCode: areaCode
    });

    if (phoneNumbers) {
      for (phoneNumber in phoneNumbers) {
        if (phoneNumber.capabilities["voice"] && phoneNumber.capabilities["SMS"]) phoneNumbers[phoneNumber.friendlyName] = phoneNumber.phoneNumber;
      }

      console.log(phoneNumbers);
      return phoneNumbers;
    }
  });
  return _getPhoneNumbers.apply(this, arguments);
}

function createUserTwilio(_x3, _x4) {
  return _createUserTwilio.apply(this, arguments);
}

function _createUserTwilio() {
  _createUserTwilio = _asyncToGenerator(function* (req, res) {});
  return _createUserTwilio.apply(this, arguments);
}

function sendMessage(_x5, _x6) {
  return _sendMessage.apply(this, arguments);
} // var i
// for (i = 0; i < phoneNumbers.length; i++) {
//   if (
//     phoneNumbers[i].capabilities["voice"] == true &&
//     phoneNumbers[i].capabilities["SMS"] == true
//   ) {
//     phoneNumbers[phoneNumbers[i].friendlyName] = phoneNumbers[i].phoneNumber
//   }
// }


function _sendMessage() {
  _sendMessage = _asyncToGenerator(function* (req, res) {});
  return _sendMessage.apply(this, arguments);
}