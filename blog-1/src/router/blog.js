/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:24:58 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-26 22:27:47
 */

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');

const {
    SuccessModel,
    ErrorModel
} = require('../module/resModule');

const handleBlogRouter = (req, res) => {
    const method = req.method;


    // 获取博客 列表
    if (method === 'GET' & req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';

        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }

    // 获取博客 详情
    if (method === 'GET' & req.path === '/api/blog/detail') {
        const id = req.query.id;
        const data = getDetail(id);

        return new SuccessModel(data);
    }

    // 新增博客
    if (method === 'POST' & req.path === '/api/blog/new') {
        const data = newBlog(req.body);

        return new SuccessModel(data);
    }

    // 更新博客 详情
    if (method === 'POST' & req.path === '/api/blog/update') {
        const id = req.query.id;
        const result = updateBlog(id, req.body);

        if (result) {
            return new SuccessModel();
        } else {
            return new ErrorModel('更新博客失败!');
        }
    }

    // 删除博客 详情
    if (method === 'POST' & req.path === '/api/blog/del') {
        const id = req.query.id;
        const result = delBlog(id);
        if (result) {
            return new SuccessModel();
        } else {
            return new ErrorModel('删除博客失败!');
        }
    }



};

module.exports = handleBlogRouter;