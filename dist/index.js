"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _models = require("./lib/models/");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const Settings = require('./settings');

const indexRouter = require('./lib/routes/index');

const topologyRouter = require('./lib/routes/topology');

const init = () => __awaiter(void 0, void 0, void 0, function* () {
  _models2.default.sequelize.sync();

  const app = (0, _express2.default)();
  app.use('/', indexRouter);
  app.use('/topology', topologyRouter);
  app.listen(Settings.port, () => {
    console.log(`Listening on port ${Settings.port}`);
  });
});

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});
init();
//# sourceMappingURL=index.js.map
