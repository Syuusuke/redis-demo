const { RedisSubscribe } = require('./redis_subscribe');

async function index() {
  const subRedis = await new RedisSubscribe(); // 实例化类, 创建连接
  await subRedis.subscribeChannel('foo'); // 订阅频道
  console.log('订阅成功');

  // 消息监听
  subRedis.onMessage((channel, message) => {
    console.log(channel, message);
  });

  // 3秒之后发布一条消息
  setTimeout(async () => {
    const pubRedis = await new RedisSubscribe();
    return pubRedis.publishMessage('foo', 'hello foo');
  }, 3000);
}

// 执行
index().catch((err) => {
  console.log(err);
});
