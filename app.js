/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:26:16 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-27 08:42:43
 */

const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');
const {get, set} = require('./src/db/redis');
const {access} = require('./src/utils/log');

const _getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    console.log(d.toGMTString());
    return d.toGMTString();
};


// 异步获取http body
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

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });

        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(JSON.parse(postData))
        })
    });
    return promise;
};

const serverHandle = (req, res) => {
    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);
    console.log('access执行了！');

    // 设置：res格式 JSON
    res.setHeader('content-type', 'application/json');
    // 解析：path
    const url = req.url;
    req.path = url.split('?')[0];
    // 解析：query
    req.query = querystring.parse(url.split('?')[1]);
    // 解析 cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;k3=v3...
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const value = arr[1].trim();
        req.cookie[key] = value;
    });

    // 解析 session ( 使用redis)
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        // 初始化 redis 中的session 值
        set(userId, {});
    }
    // 获取 session
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            // 初始化session
            set(req.sessionId, {});
            // 设置 session
            req.session = {};
        } else {
            // 设置 session
            req.session = sessionData;
        }
        console.log('req.session : ', req.session);

        return _getPostData(req);
    }).then(postData => {  // 处理：postData     note:闭包处理
            req.body = postData;

            const blogResult = handleBlogRouter(req, res);
            if (blogResult) {
                console.log("命中 blog 路由");
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${_getCookieExpires()}`);
                }
                blogResult.then(blogData => {
                    // console.log('返回的数据', blogData);
                    res.end(
                        JSON.stringify(blogData)
                    );
                });
                return;
            }

            const userResult = handleUserRouter(req, res);
            if (userResult) {
                userResult.then(userData => {
                    console.log('命中 user 路由');
                    if (needSetCookie) {
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${_getCookieExpires()}`);
                    }

                    res.end(
                        JSON.stringify(userData)
                    )
                });
                return;
            }

            // 未命中路由 ！ 返回 404
            res.writeHead(404, {"content-type": "text/plain"});
            res.write("404 NOT FOUND!\n");
            res.end();
        });
};


module.exports = serverHandle;

// process.env.NODE_ENV //代码执行环境标识