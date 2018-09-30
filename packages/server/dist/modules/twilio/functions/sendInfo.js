"use strict";

//localhost to
const http = require("http");

const express = require("express");

const MessagingResponse = require("twilio").twiml.MessagingResponse;

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.post("/sms", (req, res) => {
  var number = req.body.From;
  var msg = req.body.Body;
  const twiml = new MessagingResponse();
  twiml.message(`Hey Alex. Your number is ${number} and you sent me this message: ${msg}`);
  res.writeHead(200, {
    "Content-Type": "text/xml"
  });
  res.end(twiml.toString());
});
http.createServer(app).listen(1337, () => {
  console.log("Express server listening on port 1337");
});