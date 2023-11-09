const { Redis } = require('ioredis');

const client = new Redis() //by default runs redis server on port 6379

module.exports = {
    client
}