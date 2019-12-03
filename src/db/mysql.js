/*
 * @Author: CregskiN 
 * @Date: 2019-11-26 15:54:33 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-27 10:28:02
 */

const mysql = require('mysql');
const {
    MYSQL_CONF
} = require(('../config/db'));

/*{
    host: 'localhost',
    user: 'root',
    password: 'abc355488A',
    port: '3306',
    database: 'myblog'
}*/

//创建 连接对象
const con = mysql.createConnection(MYSQL_CONF);

//开始 连接
con.connect((err) => {
    if (err) {
        console.log('连接出错');
        return;
    }
    console.log(con.threadId);
});

// 统一执行 sql 的语句
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => { // I/O查询是异步
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });
    return promise;
}

// 不关闭 
// con.end();

module.exports = {
    exec,
    escape: mysql.escape
};