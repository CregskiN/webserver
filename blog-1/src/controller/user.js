/*
 * @Author: CregskiN 
 * @Date: 2019-11-25 22:20:34 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-25 22:41:05
 */

 const loginCheck = (username,password) => {
     // 测试阶段 使用假数据
     if (username === 'zhangsan' && password === '123'){
         return true;
     }
     return false;
 }

 module.exports = {
    loginCheck,
 }