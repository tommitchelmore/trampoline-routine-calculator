"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _express=require("express"),_path=require("path"),router=(0,_express.Router)();/*
OR TO SERVE AN SPA FROM /client/build (ie React, Vue, etc)

router.get('*', (req, res) => {
    res.sendFile('index.html', { root: resolve(__dirname, './../client/build') })
})
*/router.get("/",function(a,b){b.send("Hello!")}),exports.default=router;
//# sourceMappingURL=mainRoutes.js.map