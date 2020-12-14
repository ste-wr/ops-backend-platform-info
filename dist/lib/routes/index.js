"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.route('/').get((req, res) => {
  res.status(200).send('OK');
});
module.exports = router;
//# sourceMappingURL=index.js.map
