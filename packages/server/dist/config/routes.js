"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _router = _interopRequireDefault(require("../modules/user/router"));

var _router2 = _interopRequireDefault(require("../modules/twilio/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/ping", (req, res) => {
  res.status(200).send({});
});
router.use("/user", _router.default);
router.use("/twilio", _router2.default);
var _default = router;
exports.default = _default;