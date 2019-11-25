/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:25:08 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-25 22:42:48
 */

const {
    loginCheck
} = require('../controller/user');

const {
    SuccessModel,
    ErrorModel,
} = require('../module/resModule');

// 登录
const handleUserRouter = (req, res) => {
    const method = req.method;

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body;
        const result = loginCheck(username, password);

        if (result) {
            return new SuccessModel();
        }
        return new ErrorModel('登陆失败！');
    }



};

module.exports = handleUserRouter;