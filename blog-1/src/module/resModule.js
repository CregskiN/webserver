/*
 * @Author: CregskiN 
 * @Date: 2019-11-25 08:06:30 
 * @Last Modified by: CregskiN
 * @Last Modified time: 2019-11-25 08:12:14
 */

class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}