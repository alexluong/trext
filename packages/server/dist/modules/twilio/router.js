"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var controllers = _interopRequireWildcard(require("./controllers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // POST /twilio/get-phone-numbers


router.post("/get-phone-numbers", controllers.getPhoneNumbers); // POST /twilio/create-user-twilio

router.post("/create-user-twilio", controllers.createUserTwilio); // POST /twilio/send-message

router.post("/send-message", controllers.sendMessage);
var _default = router;
exports.default = _default;