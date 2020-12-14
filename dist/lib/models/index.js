"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Sequelize = require("sequelize");

const Settings = require('../../settings');

const dbSettings = Settings[Settings.env].db;
const db = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, dbSettings);
const models = {
  sequelize: null,
  Sequelize: null
};

_fs2.default.readdirSync(__dirname).filter(file => file.indexOf(".") !== 0 && file !== "index.js" && !file.endsWith("map")).forEach(file => {
  const model = require(_path2.default.join(__dirname, file))(db, Sequelize.DataTypes);

  models[model.name] = model;
});

models.sequelize = db;
models.Sequelize = Sequelize;
exports.default = models;
//# sourceMappingURL=index.js.map
