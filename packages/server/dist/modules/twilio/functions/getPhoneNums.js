"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken); // Find and then purchase a phone number


function getPhoneNumbers(areaCode) {
  var numbers = {};
  client.availablePhoneNumbers("US").local.list({
    areaCode: areaCode
  }).then(data => {
    var i;

    for (i = 0; i < data.length; i++) {
      if (data[i].capabilities["voice"] == true && data[i].capabilities["SMS"] == true) {
        numbers[data[i].friendlyName] = data[i].phoneNumber;
      }
    }

    console.log(numbers);
    return numbers;
  });
}

var _default = getPhoneNumbers;
exports.default = _default;