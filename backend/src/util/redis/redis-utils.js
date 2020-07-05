'use strict';
const Redis = require('./redis-client');
const log = require('../../components/logger');
const penReqSagaEventKey = 'PEN_REQUEST_SAGA_EVENTS';
const safeStringify = require('fast-safe-stringify');
const RedLock = require('redlock');
let redLock;
const redisUtil = {
  /**
   *
   * @param event the event object to be stored , this contains sagaId, penRequestId,digitalId, eventPayload etc..
   * @returns {Promise<void>}
   */
  async createPenRequestSagaRecordInRedis(event) {
    try {
      const redisClient = Redis.getRedisClient();
      if (redisClient) {
        await this.addElementToSagaRecordInRedis(event.sagaId, event);
      } else {
        log.error('Redis client is not available, this should not have happened');
      }
    } catch (e) {
      log.error(`Error ${e}`);
    }
  },
  async removePenRequestSagaRecordFromRedis(event) {
    const redisClient = Redis.getRedisClient();
    if (redisClient) {
      try {
        const result = await redisClient.smembers(penReqSagaEventKey);
        log.silly(`result from redis for ${penReqSagaEventKey} is ${result}`);
        if (result && result.length > 0) {
          for (const element of result) {
            const eventArrayElement = JSON.parse(element);
            if ((eventArrayElement.sagaId && event.sagaId && eventArrayElement.sagaId === event.sagaId) && ('COMPLETED' === event.sagaStatus)) {
              log.info(`going to delete this event record as it is completed. ${eventArrayElement.sagaId}`);
              await this.removeSagaRecordFromRedis(event.sagaId, eventArrayElement);
              break;
            }
          }
        }
      } catch (e) {
        log.error(`Error ${e}`);
      }
    } else {
      log.error('Redis client is not available, this should not have happened');
    }
  },
  async getPenRequestSagaEvents() {
    const redisClient = Redis.getRedisClient();
    if (redisClient) {
      return redisClient.smembers(penReqSagaEventKey);
    } else {
      log.error('Redis client is not available, this should not have happened');
    }
  },
  async removeSagaRecordFromRedis(sagaId, eventToDelete) {
    const redisClient = Redis.getRedisClient();
    try {
      await this.getRedLock().lock(`locks:pen-request-saga:deleteFromSet-${sagaId}`, 500);
      await redisClient.srem(penReqSagaEventKey, safeStringify(eventToDelete));
    } catch (e) {
      log.info(`this pod could not acquire lock for locks:pen-request-saga:deleteFromSet-${sagaId}, check other pods. ${e}`);
    }
  },
  async addElementToSagaRecordInRedis(sagaId, eventToAdd) {
    const redisClient = Redis.getRedisClient();
    try {
      await this.getRedLock().lock(`locks:pen-request-saga:addToSet-${sagaId}`, 500);
      await redisClient.sadd(penReqSagaEventKey, safeStringify(eventToAdd));
    } catch (e) {
      log.info(`this pod could not acquire lock for locks:pen-request-saga:addToSet-${sagaId}, check other pods. ${e}`);
    }
  },
  getRedLock() {
    if (redLock) {
      return redLock; // reusable red lock object.
    } else {
      redLock = new RedLock(
        [Redis.getRedisClient()],
        {
          // the expected clock drift; for more details
          // see http://redis.io/topics/distlock
          driftFactor: 0.01, // time in ms

          // the max number of times Redlock will attempt
          // to lock a resource before erroring
          retryCount: 4,

          // the time in ms between attempts
          retryDelay: 50, // time in ms

          // the max time in ms randomly added to retries
          // to improve performance under high contention
          // see https://www.awsarchitectureblog.com/2015/03/backoff.html
          retryJitter: 25 // time in ms
        }
      );
    }

    redLock.on('clientError', function (err) {
      log.error('A redis connection error has occurred in getRedLock of redis-util:', err);
    });
    return redLock;
  }

};

module.exports = redisUtil;
