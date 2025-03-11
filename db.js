const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/hotels');
module.exports = db;
const database = mongoose.connection;
database.on('connected', () => {
    console.log('Connected to MongoDB Server');
});
database.on('error', (err) => {
    console.log('Error connecting to MongoDB Server', err);
});
database.on('disconnected', () => {
    console.log('Disconnected from MongoDB Server');
});
