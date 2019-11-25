/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:26:16 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-24 23:15:05
 */

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');


    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        );
        return;
    }

    
    // 处理 user 路由
    const userData = handleUserRouter(req, res);
    if (userData) {
        res.end(
            JSON.stringify(userData)
        );
        return;
    }


    // 未命中路由 ！ 返回 404
    res.writeHead(404, {
        "Content-type" : "text/plain"
    });
    res.write("404 NOT FOUND!");
    res.end();
};

module.exports = serverHandle;

// process.env.NODE_ENV //代码执行环境标识