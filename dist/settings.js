"use strict";

require("dotenv").config({
  silent: true
});

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  development: {
    db: {
      dialect: "sqlite",
      storage: ":memory:",
      database: "platform"
    }
  },
  production: {
    db: {
      dialect: "sqlite",
      storage: "db/platform.sqlite",
      database: "platform"
    }
  }
};
//# sourceMappingURL=settings.js.map
