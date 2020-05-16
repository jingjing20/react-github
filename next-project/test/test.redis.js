const Redis = require('ioredis');

const redis = new Redis({
  port: 6378,
  password: 109872
})

redis.keys('*').then(data => {
  console.log("keys", data)
})