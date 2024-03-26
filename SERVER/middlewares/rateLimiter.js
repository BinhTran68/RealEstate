const  redis = require('../config/redis.config')

const rateLimiter = async (req, res, next) => {
    const clientId = req.headers?.clientId
    const currentTime = Date.now() // ms

    const client = await redis.hGetAll('clientId');
    // check client id has in redis
    if (Object.keys(client).length === 0) {
        await redis.hSet(`rateLimit${clientId}}`, 'createAt', currentTime)
        await redis.hSet(`rateLimit${clientId}}`, 'count', 1)
        return next()
    }
    // let difference =
//

}