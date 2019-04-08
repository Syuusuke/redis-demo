
const Redis = require('ioredis');

class RedisSubscribe {
  constructor({
    port = 6379, host = '127.0.0.1', password = '', db = 0,
  } = {}) {
    this.sub = new Redis({
      port, host, family: 4, password, db,
    });
  }

  selectDb(db) {
    return this.sub.select(db);
  }

  subscribeChannel(channel) {
    return this.sub.subscribe(channel);
  }

  onMessage(fun) {
    return this.sub.on('message', fun);
  }

  publishMessage(channel, message) {
    return this.sub.publish(channel, message);
  }
}

module.exports = { RedisSubscribe };
