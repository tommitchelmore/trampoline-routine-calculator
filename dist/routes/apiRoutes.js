"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var router = (0, _express.Router)();

router.get('/', function (req, res) {
    res.json({ "status": 200 });
});

exports.default = router;
//# sourceMappingURL=apiRoutes.js.map