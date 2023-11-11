const express = require('express');
const app = express()
const { client } = require('./client')
const axios = require('axios')

app.get('/', async (req, res) => {
    try {
        const cachedValue = await client.get('todos');
        if(cachedValue) return res.json(JSON.parse(cachedValue));

        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos")
        await client.set('todos', JSON.stringify(data));
        await client.expire('todos', 10)
        return res.json(data)
    } catch(e) {
        res.send(e)
    }
});

app.listen(3000, () => console.log(`Server running on port 3000`))