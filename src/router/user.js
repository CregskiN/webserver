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
            // console.log('登陆结果为：', loginData); // 在数据库查到了账号的loginData 派发一个cookie
            if (loginData.username) {
                // 设置 session
                req.session.username = loginData.username;
                req.session.realname = loginData.realname;
                // 同步到redis
                set(req.sessionId, req.session);

                return new SuccessModel();
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