/*
 * @Author: CregskiN 
 * @Date: 2019-11-26 15:54:28 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-27 10:27:34
 */

const env = process.env.NODE_ENV; // 获取环境参数

console.log('环境为' + env);

// 配置
let MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'abc355488A',
    port: '3306',
    database: 'myblog'
};

// 判断：运行环境
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'abc355488A',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'abc355488A',
        port: '3306',
        datebase: 'myblog'
    };
}

console.log('config中输出的mysql连接配置是' , MYSQL_CONF);

module.exports = {
    MYSQL_CONF
};