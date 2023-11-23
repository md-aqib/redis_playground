const express = require('express');
const app = express()
const morgan = require('morgan')
const { client } = require('./client')
//const axios = require('axios')
const { basePath, baseRouter } = require('./helper/routeHandler')
const { connectDb } = require('./helper/connection')
connectDb()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/', async (req, res) => {
//     try {
//         const cachedValue = await client.get('todos');
//         if(cachedValue) return res.json(JSON.parse(cachedValue));

//         const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos")
//         await client.set('todos', JSON.stringify(data));
//         await client.expire('todos', 10)
//         return res.json(data)
//     } catch(e) {
//         res.send(e)
//     }
// });
app.use(basePath, baseRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});