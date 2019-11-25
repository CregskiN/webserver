/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:25:08 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-24 23:18:47
 */

 const handleUserRouter = (req,res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];


     // 登录
     if (method === 'POST' && path === 'api/user/login') {
        return {
            msg: '这是登录的接口'
        }
    }



 };

 module.exports = handleUserRouter;
