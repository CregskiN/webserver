/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:45:41 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-24 23:12:51
 */

// 导入： 模块
const http = require('http');
const serverHandle = require('./app');

// 导入： 默认配置
const config = require('./config/defaultConfig');


const server = http.createServer((req, res) => {
    serverHandle(req, res);

});


server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});


