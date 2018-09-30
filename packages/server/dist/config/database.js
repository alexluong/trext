"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function connectDatabase() {
  return _connectDatabase.apply(this, arguments);
}

function _connectDatabase() {
  _connectDatabase = _asyncToGenerator(function* () {
    try {
      _mongoose.default.set("useCreateIndex", true);

      yield _mongoose.default.connect(_index.default.databaseUrl, {
        useNewUrlParser: true
      });
      console.log("Database connected");
    } catch (error) {
      console.error(`Database connection error: ${error}`);
    }
  });
  return _connectDatabase.apply(this, arguments);
}

connectDatabase();