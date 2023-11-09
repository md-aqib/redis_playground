const { client } = require('./client');

async function init() {
    const setData = await client.set('user:1', 'Hey from aqib');
    //const expireData = await client.expire('user:1', 10);
    const result = await client.get('user:1');
    console.log(result)
}
init()