
const {exec, escape} = require('../db/mysql'); // 导入：执行语句的 promise 壳
const xss = require('xss');

// '/api/blog/list' 博客列表
const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `; // 常规操作where 1=1
    if (author) {
        author = escape(author);
        sql += `and author=${author} `;
    }
    if (keyword) {
        keyword = escape(keyword);
        sql += `and title like %${keyword}% `;
    }
    sql += `order by createtime desc;`;
    // 返回完整的promise
    return exec(sql).then(listData => {
        // console.log('博客列表操作数据库返回结果为：', listData);
        return listData;
    });
};

// '/api/blog/detail' 博客详情
const getDetail = (id) => {
    id = escape(id);
    const sql = `select * from blogs where id=${id};`;

    return exec(sql).then(detailDataRows => { // 以数组对象形式返回，需要选中返回第一个[0]
        // console.log('博客详情操作数据库返回结果为：', detailDataRows[0]);
        return detailDataRows[0];
    });
};

// '/api/blog/new' 新增博客
// PS: 需要接收数据，1.组成核心resData 2.传递到数据库
const newBlog = (blogData = {}) => {
    // blogData={} 为es6语法 接受一个对象 包含title content
    const title = xss(blogData.title);
    const content = xss(blogData.content);
    const author = blogData.author;
    const createTime = Date.now();

    const sql = `insert into blogs (title, content, author, createtime) values(${escape(title)}, ${escape(content)}, ${escape(author)}, ${createTime}); `;

    return exec(sql).then(insertData => {
        // console.log('新增博客操作数据库返回结果为：', insertData);
        return {
            id: insertData.insertId
        }
    })
};

// '/api/blog/update' 更新博客
const updateBlog = (id, blogData = {}) => {
    // id: 要更新博客的id
    // blogData: 新的博客内容 包含title content
    const title = xss(blogData.title);
    const content = xss(blogData.content);

    const sql = `update blogs set title=${escape(title)}, content=${escape(content)} where id=${id}; `;
    return exec(sql).then(updataData => {
        // console.log('u更新博客操作数据库返回结果为：', updataData);
        if (updataData.affectedRows > 0) {
            return true;
        }
        return false;
    })
};

// '/api/blog/del' 删除博客
const delBlog = (id, author) => {
    // id: 要删除博客的id'

    const sql = `delete from blogs where id=${escape(id)} and author=${escape(author)}; `;
    return exec(sql).then(delData => {
        // console.log('删除博客操作数据库返回结果为：', delData);
        if (delData.affectedRows > 0) {
            return true;
        }
        return false;
    })
};


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
};