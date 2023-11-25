const { client } = require('../../../client')


const cacheMiddleware = async (req, res, next) => {
    try {
        const { page  } = req.body;
        const key = `${req.originalUrl}:${page}`;
        console.log(key)
        const data = await client.get(key)
        if (data) {
            console.log('Data retrieved from cache', key);
            req.cached = true;
            return res.json({
                meta: { msg: "List found successfully", status: true },
                ...JSON.parse(data),
            });
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