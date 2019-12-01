/*
 * @Author: CregskiN 
 * @Date: 2019-11-24 22:24:58 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-26 22:27:47
 */

const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../module/resModule');

// 统一登陆验证的函数
const _loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登陆')
        )
    }
};


const handleBlogRouter = (req, res) => {
    const method = req.method;

    // 获取博客 列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';

        if (req.query.isadmin) {
            const loginCheckResult = _loginCheck(req);
            if(loginCheckResult) {
                // 未登录
                return loginCheckResult;
            }
            // 强制查询自己的博客
            author = req.session.username;
        }

        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }

    // 获取博客 详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id;
        const result = getDetail(id);

        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    // 新增博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const loginCheckResult = _loginCheck(req);
        // 未登录
        if (loginCheckResult){
            return loginCheckResult;
        }

        req.body.author = req.session.username; // 假数据，开发登录后改成真实数据
        const result = newBlog(req.body);

        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {

        const loginCheckResult = _loginCheck(req);
        if (loginCheckResult){
            return loginCheckResult;
        }

        const id = req.query.id;
        const result = updateBlog(id, req.body);

        return result.then(isUpdate => {
            if (isUpdate) {
                return new SuccessModel();
            } else {
                return new SuccessModel('更新博客失败');
            }
        })

    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = _loginCheck(req);
        if (loginCheckResult){
            return loginCheckResult;
        }

        const id = req.query.id;
        const author = req.session.username; // 假数据，开发登录后改成真实数据
        const result = delBlog(id, author);
        return result.then(isUpdate => {
            if (isUpdate) {
                return new SuccessModel();
            } else {
                return new ErrorModel('删除博客失败!');
            }
        })

    }

};

module.exports = handleBlogRouter;