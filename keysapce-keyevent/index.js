const { RedisKeySpace } = require('./redis_keyspace');

async function index() {
  const subRedis = await new RedisKeySpace(); // 实例化类, 创建连接
  await subRedis.subscribeChannel('__keyevent@0__:expired'); // 订阅频道
  console.log('订阅成功');

  const handleFunc = async function (channel, message) {
    console.log(channel, message);
  };

  // 消息监听
  await subRedis.onMessage(handleFunc).catch((err) => {
    console.log(err);
  });

  // 设置一个10秒超时的key
  const commonRedis = await new RedisKeySpace();
  await commonRedis.set('key', 100, 'EX', 10);
}

// 执行
index().catch((err) => {
  console.log(err);
});
