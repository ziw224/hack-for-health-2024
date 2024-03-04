// src/config/database.js

const mongoose = require('mongoose');

const dev_db_url =
  "mongodb+srv://dbuser:admin@cluster0.afn1qa6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const url = "mongodb+srv://dbuser:admin@cluster0.afn1qa6.mongodb.net/"

mongoose.connect(dev_db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Added to suppress deprecation warning
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
