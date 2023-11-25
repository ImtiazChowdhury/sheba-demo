class HTTPException{
    constructor(status, message, errorList){
        this.status = status;
        this.message = message;
        this.errorList = errorList;
    }
}

module.exports = HTTPException;