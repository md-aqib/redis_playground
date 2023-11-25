const { client } = require('../../../client')


const cacheMiddleware = async (req, res, next) => {
    try {
        const key = req.originalUrl;
        const data = await client.get(key)
        if (data) {
            console.log('Data retrieved from cache');
            req.cachedData = JSON.parse(data);
            req.cached = true;
            next();
        } else {
            console.log('Data not found in cache');
            req.cached = false;
            next();
        };
    } catch(e) {
        console.error('Error reading from Redis:', e);
        next();
    }
}

module.exports = {
    cacheMiddleware
}