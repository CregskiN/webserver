const {login} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../module/resModule');
const {set} = require('../db/redis');

// 登录
const handleUserRouter = (req, res) => {
    const method = req.method;

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body;
        const result = login(username, password);
        return result.then(loginData => {
            console.log(loginData);
            if (loginData.username) {
                // 设置 session
                req.session.username = loginData.username;
                req.session.realname = loginData.realname;
                console.log("组装完的session为", req.session);
                // 同步到 redis
                set(req.sessionId, req.session);
                return new SuccessModel('登录成功');
            }
            return new ErrorModel('登陆失败！');
        });
    }

    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         );
    //     }
    //     return Promise.resolve(
    //         new ErrorModel('尚未登陆')
    //     );
    // }

};

module.exports = handleUserRouter;