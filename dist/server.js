'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _apiRoutes = require('./routes/apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

var _mainRoutes = require('./routes/mainRoutes');

var _mainRoutes2 = _interopRequireDefault(_mainRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _helmet2.default)());
app.use((0, _morgan2.default)('tiny'));

app.use(_mainRoutes2.default);
app.use('/api/v1', _apiRoutes2.default);

app.listen();

exports.default = app;
//# sourceMappingURL=server.js.map