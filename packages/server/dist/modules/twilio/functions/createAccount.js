"use strict";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

client.api.accounts.create({
  friendlyName: "FORREAL FORREAL Dude"
}).then(account => {
  //use their name from sign up
  console.log("Sid: ");
  console.log(account.sid); //Put this in the database as SID

  console.log("authToken: ");
  console.log(account.authToken); //Put this in the database as authToken
});