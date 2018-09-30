"use strict";

var _config = _interopRequireDefault(require("./config"));

require("./config/database");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./config/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Config
// App Setup
const app = (0, _express.default)();
app.use((0, _morgan.default)("combined"));
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json({
  type: "*/*",
  limit: "200mb"
}));
app.use("/", _routes.default); // Server Setup

const port = _config.default.port;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});