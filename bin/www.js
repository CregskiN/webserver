/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:45:41 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-27 10:11:22
 */

// 导入： 模块
const http = require('http');
const serverHandle = require('../app');

// 导入： 默认配置
const config = require('../src/config/defaultConfig');



const server = http.createServer(serverHandle);


// server.listen(config.port);
// console.log('Listening ...');

server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});


