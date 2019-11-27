/*
 * @Author: CregskiN 
 * @Date: 2019-11-25 08:06:35 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-26 21:27:05
 */

const {
    exec
} = require('../db/mysql'); // 导入：执行语句的 promise 壳



// '/api/blog/list' 博客列表
const getList = (author, keyword) => {
    // 组装mysql语句
    let sql = `select * from blogs where 1=1 `; // 常规操作where 1=1
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc;`;
    // 返回完整的promise
    return exec(sql);
}

// '/api/blog/detail' 博客详情
const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: 'zhangsan'
    }
}

// '/api/blog/new' 新增博客 // PS: 需要接收数据，1.组成核心resData 2.传递到数据库
const newBlog = (blogData = {}) => {
    // blogData={} 为es6语法 接受一个对象 包含title content
    console.log('newBlog blogData...', blogData);

    return {
        id: 3, // 新建博客插入到数据表的id 
    }
}

// '/api/blog/update' 更新博客
const updateBlog = (id, blogData = {}) => {
    // id: 要更新博客的id
    // blogData: 新的博客内容 包含title content
    console.log('update blog', id, blogData);

    return true;
}


// '/api/blog/del' 删除博客
const delBlog = (id) => {
    // id: 要删除博客的id
    return true;
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}