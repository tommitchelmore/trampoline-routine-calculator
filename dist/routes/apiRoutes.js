'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _express=require('express'),_exampleController=require('../controllers/exampleController'),_exampleController2=_interopRequireDefault(_exampleController);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var router=(0,_express.Router)();router.get('/',_exampleController2.default.helloWorld),exports.default=router;
//# sourceMappingURL=apiRoutes.js.map