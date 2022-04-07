const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/user-routes');
const authRoutes = require('../controllers/auth-routes');
const frontRoutes = require('../controllers/front-routes');
const sessionRoutes = require('../controllers/session-routes');
const userSessionRoutes = require('../controllers/user-session-routes');
const meetRoutes = require('../controllers/meet-routes');
const path = require("path");

class WebServer {
  app = undefined;
  port = 3000;
  server = undefined;

  constructor() {
    this.app = express();

    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  _initializeRoutes() {
    this.app.use('/users', userRoutes.initializeRoutes());
    this.app.use(authRoutes.initializeRoutes())
    this.app.use(frontRoutes.initializeRoutes())
    this.app.use('/sessions', sessionRoutes.initializeRoutes())
    this.app.use('/userSessions', userSessionRoutes.initializeRoutes())
    this.app.use('/meet', meetRoutes.initializeRoutes())
  }
}

module.exports = WebServer;