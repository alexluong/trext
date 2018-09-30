"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.signUp = signUp;
exports.resend = resend;
exports.verify = verify;
exports.get = get;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _awaitToJs = _interopRequireDefault(require("await-to-js"));

var _config = _interopRequireDefault(require("../../config"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function signIn(_x, _x2) {
  return _signIn.apply(this, arguments);
} // Create a new user based on the form submission


function _signIn() {
  _signIn = _asyncToGenerator(function* (req, res) {
    let error, user // Get user
    ;
    [error, user] = yield (0, _awaitToJs.default)(_model.default.findOne({
      email: req.body.email
    }));
    if (error || !user) return userNotFound(res);
    const isMatch = yield user.comparePassword(req.body.password);
    if (!isMatch) return res.status(401).send({
      message: "Unathorized."
    });else return res.status(200).send(createAuthPayload(user));
  });
  return _signIn.apply(this, arguments);
}

function signUp(_x3, _x4) {
  return _signUp.apply(this, arguments);
} // Resend a code if it was not received


function _signUp() {
  _signUp = _asyncToGenerator(function* (req, res) {
    let error;
    const params = req.body; // Create a new user based on form parameters

    const user = new _model.default({
      fullName: params.fullName,
      email: params.email,
      phone: params.phone,
      countryCode: params.countryCode,
      password: params.password
    });
    let newUser;
    [error, newUser] = yield (0, _awaitToJs.default)(user.save());
    if (error) return res.status(400).send({
      message: "User already exists."
    }) // If the user is created successfully, send them an account
    // verification token
    ;
    [error] = yield (0, _awaitToJs.default)(user.sendAuthyToken());
    if (error) return cannotSendMessage(res);
    res.status(200).send({
      user: newUser
    });
  });
  return _signUp.apply(this, arguments);
}

function resend(_x5, _x6) {
  return _resend.apply(this, arguments);
} // Handle submission of verification token


function _resend() {
  _resend = _asyncToGenerator(function* (req, res) {
    let error, user // Get user
    ;
    [error, user] = yield (0, _awaitToJs.default)(_model.default.findById(req.params.id));
    if (error || !user) return userNotFound(res) // If we find the user, let's send them a new code
    ;
    [error] = yield (0, _awaitToJs.default)(user.sendAuthyToken());
    if (error) return cannotSendMessage(res);
    res.sendStatus(200);
  });
  return _resend.apply(this, arguments);
}

function verify(_x7, _x8) {
  return _verify.apply(this, arguments);
} // Get user data


function _verify() {
  _verify = _asyncToGenerator(function* (req, res) {
    let error, user // Get user
    ;
    [error, user] = yield (0, _awaitToJs.default)(_model.default.findById(req.body.id));
    if (error || !user) return userNotFound(res) // If we find the user, let's send them a new code
    ;
    [error] = yield (0, _awaitToJs.default)(user.verifyAuthyToken(req.body.code));
    if (error) return res.status(400).send({
      message: "Cannot verify user."
    });
    user.verified = true;
    let savedUser;
    [error, savedUser] = yield (0, _awaitToJs.default)(user.save());
    if (error) return serverError(res);
    const message = "You did it! Signup complete :)";
    [error] = yield (0, _awaitToJs.default)(user.sendMessage(message));
    if (error) return cannotSendMessage(res);
    res.status(200).send(createAuthPayload(savedUser));
  });
  return _verify.apply(this, arguments);
}

function get(_x9, _x10) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = _asyncToGenerator(function* (req, res) {
    let error, user;
    [error, user] = yield (0, _awaitToJs.default)(_model.default.findById(req.params.id));
    if (error || !user) return userNotFound(res);
    res.status(200).send({
      user
    });
  });
  return _get.apply(this, arguments);
}

function userNotFound(res) {
  res.status(404).send({
    message: "User not found."
  });
}

function cannotSendMessage(res) {
  res.status(503).send({
    message: "Cannot send message. Our bad :("
  });
}

function serverError(res) {
  res.sendStatus(500);
}

function createAuthPayload(user) {
  return {
    token: _jsonwebtoken.default.sign({
      userId: user.id
    }, _config.default.jwtSecret),
    user
  };
}