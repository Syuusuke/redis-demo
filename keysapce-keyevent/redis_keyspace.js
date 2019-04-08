
const Redis = require('ioredis');


class RedisKeySpace {
  constructor({
    port = 6379, host = '127.0.0.1', password = '', db = 0,
  } = {}) {
    const promise = new Promise((resolve, reject) => {
      this.redisClient = new Redis({
        port, host, family: 4, password, db,
      });
      this.redisClient.on('ready', (err) => {
        if (err) reject(err);
        this.redisClient.config('SET', 'notify-keyspace-events', 'Ex');
        resolve(this);
      });
    });

    return promise;
  }

  selectDb(db) {
    return this.redisClient.select(db);
  }

  subscribeChannel(channel) {
    return this.redisClient.subscribe(channel);
  }

  async onMessage(fun) {
    return this.redisClient.on('message', fun);
  }

  publishMessage(channel, message) {
    return this.redisClient.publish(channel, message);
  }

  get(key) {
    return this.redisClient.get(key);
  }

  set(...args) {
    return this.redisClient.set(args);
  }
}

module.exports = { RedisKeySpace };
