// const mongoose = require('mongoose');
// //const db = mongoose.connect('mongodb://localhost:27017/hotels');
// const db = 'mongodb+srv://binmayadash143:Dash123@cluster0.zecx5.mongodb.net/';
// module.exports = db;
// const database = mongoose.connection;
// database.on('connected', () => {
//     console.log('Connected to MongoDB Server');
// });
// database.on('error', (err) => {
//     console.log('Error connecting to MongoDB Server', err);
// });
// database.on('disconnected', () => {
//     console.log('Disconnected from MongoDB Server');
// });

const mongoose = require('mongoose');
require('dotenv').config();
//const dbURI ='mongodb://localhost:27017/hotels';
// const dbURI = 'mongodb+srv://binmayadash143:Dash123@cluster0.zecx5.mongodb.net/?retryWrites=true&w=majority';
//const dbURI = process.env.DB_URL_LOCAL;
const dbURI = process.env.DB_URL;
// Function to connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 30000 });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit if connection fails
  }
}

// Start the connection
connectDB();

// const mongoose = require('mongoose');

// const dbURI = 'mongodb+srv://binmayadash143:Dash123@cluster0.zecx5.mongodb.net/?retryWrites=true&w=majority';

// // Function to connect to MongoDB
// async function connectDB() {
//   try {
//     await mongoose.connect(dbURI, { serverSelectionTimeoutMS: 30000 });
//     console.log('✅ Connected to MongoDB');
//     runDatabaseOperations(); // Only run queries AFTER successful connection
//   } catch (error) {
//     console.error('❌ MongoDB Connection Error:', error);
//     process.exit(1); // Exit the process if connection fails
//   }
// }

// // Define schema & model
// const peopleSchema = new mongoose.Schema({ name: String });
// const People = mongoose.model('People', peopleSchema);

// // Function to run queries after connection
// async function runDatabaseOperations() {
//   try {
//     const newPerson = await People.create({ name: "John Doe" });
//     console.log('✅ Data Inserted:', newPerson);
//   } catch (error) {
//     console.error('❌ Query Error:', error);
//   }
// }

// // Start the connection
// connectDB();
