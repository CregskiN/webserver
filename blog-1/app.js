/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:26:16 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-27 08:42:43
 */

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');

// 用于处理postData
const _getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }

        // 组装postData
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })

        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)
            )

        })
    })
    return promise;
}


const serverHandle = (req, res) => {

    // 设置：返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 解析：path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析：query
    req.query = querystring.parse(url.split('?')[1]);

    // ! server端获取流文件为 异步 过程， 需用promise包装，保证其内能获取完整的数据
    // 处理：postData     note:闭包处理
    _getPostData(req).then(postData => {
        req.body = postData;

        // 处理 blog 路由   note:闭包处理的优势
        // const blogData = handleBlogRouter(req, res);
        // if (blogData){
        //      res.end(
        //          JSON.stringify(blogData)
        //      );
        //      return;
        // }
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            console.log("命中blog路由");
            blogResult.then(blogData => {
                console.log('返回的数据');
                console.log(blogData);
                
                res.end(
                    JSON.stringify(blogData)
                );
            });
            return;
        }


        // 处理 user 路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            console.log("命中user路由");

            res.end(
                JSON.stringify(userData)
            );
            return;
        }


        // 未命中路由 ！ 返回 404
        res.writeHead(404, {
            "Content-type": "text/plain"
        });
        res.write("404 NOT FOUND!\n");
        res.end();
    });
};



module.exports = serverHandle;

// process.env.NODE_ENV //代码执行环境标识