const http = require('http');
const querystring = require('querystring');



const server = http.createServer((req, res) => {

    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0]; // 分割url获取路由部分
    const query = querystring.parse(url.split('?')[1]); //分割url获取查询路径部分

    // 设置返回格式为json
    res.setHeader('Content-type', 'application/json');

    // 返回的数据
    const resData = {
        method,
        url,
        path,
        query
    };

    // 返回操作
    if (method === 'GET') {
        console.log(resData);
        res.end(JSON.stringify(resData))
    }

    if (method === 'POST') {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            resData.postData = postData;
            res.end(JSON.stringify(resData));
        })

    }

});


server.listen(9090);
console.log('listening ..');