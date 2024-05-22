const ClientError = require('../exceptions/ClientError');

class TooLargeFile extends ClientError{
    constructor(message = 'Payload content length greater than maximum allowed: 1000000'){
        super(message);
        this.name = 'TooLargeFile';
        this.statusCode = 413;
    }
}

module.exports = TooLargeFile;