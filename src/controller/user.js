/*
 * @Author: CregskiN 
 * @Date: 2019-11-25 22:20:34 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-25 22:41:05
 */

const {exec} = require('../db/mysql');

const login = (username, password) => {
    const sql = `select username,realname from users where username='${username}' and password=${password}; `;

    return exec(sql).then(loginDataRows => {
        return loginDataRows[0] || {};
    });
};

module.exports = {
    login,
};