const { connect, connection } = require('mongoose')

const connectDb = async () => {
    try {
        connect('mongodb://127.0.0.1:27017/todo-app');

        // Check if the connection is successful
        const db = connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('MongoDB Connected Successfully :)');
        });
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

module.exports = { connectDb }