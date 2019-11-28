const redis = require('redis');
const {REDIS_CONF} = require('../config/db');

//单例

// 创建连接
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

// 监听连接失败事件
redisClient.on('error', err => {
    console.log(err);
});

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val === null){
                resolve(null);
                return;
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch(ex){
                resolve(val);
            }

        });
    });
    return promise;
}

// 退出
// redisClient.quit();

module.exports = {
    set,
    get
};