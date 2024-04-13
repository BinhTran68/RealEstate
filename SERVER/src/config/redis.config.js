const  redis = require('redis')

const client =  redis.createClient();
client.on('error', err => console.log('Redis Client Error', err));
const redisConnection = async () => {
    await client.connect();
    console.log('REDIS CONNECTED ')
}
redisConnection()
module.exports = client

