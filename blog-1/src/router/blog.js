/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:24:58 
 * @Last Modified by:   CregskiN 
 * @Last Modified time: 2019-11-24 22:24:58 
 */


const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    
    // 获取博客 列表
    if (method === 'GET' && path === 'api/blog/list'){
        return {
            msg: '这是获取博客列表的接口'
        }
    }
    // 获取博客 详情
    if (method === 'GET' && path === 'api/blog/detail') {
        return {
            msg: '这是获取博客详情的接口'
        }
    }
    // 新增博客
    if (method === 'POST' && path === 'api/blog/new') {
        return {
            msg: '这是新增博客的接口'
        }
    }
    // 更新博客 详情
    if (method === 'POST' && path === 'api/blog/update') {
        return {
            msg: '这是更新博客的接口'
        }
    }
    // 删除博客 详情
    if (method === 'POST' && path === 'api/blog/del') {
        return {
            msg: '这是删除博客的接口'
        }
    }

   
    
};

module.exports = handleBlogRouter;