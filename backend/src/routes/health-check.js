'use strict';
const redis = require('../util/redis/redis-client');
const nats = require('../messaging/message-pub-sub');
const express = require('express');

class HealthCheckController {
  constructor(redis, nats, express) {
    this._redis = redis;
    this._nats = nats;
    this._router = express.Router();
    this._router.get('/health', (req, res) => this.healthCheck(req, res));
  }

  get router() {
    return this._router;
  }

  async healthCheck(req, res) {
    if (this._redis.isConnectionClosed() || this._nats.isConnectionClosed()) {
      res.sendStatus(503);
    } else {
      res.sendStatus(200);
    }
  }
}


let healthCheckController = new HealthCheckController(redis, nats, express);
module.exports = healthCheckController;
