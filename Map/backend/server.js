const express = require('express');
const app = express();
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const firebaseConfig = {
    apiKey: "your private api key",
    authDomain: "chat-e6d6a.firebaseapp.com",
    projectId: "chat-e6d6a",
    storageBucket: "chat-e6d6a.appspot.com",
    messagingSenderId: "958123746376",
    appId: "1:958123746376:web:f348b86521ee89af92247d",
    credential: admin.credential.cert(serviceAccount),
};

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "chat-e6d6a.appspot.com"
// });

admin.initializeApp(firebaseConfig)
// let database = admin.database()
// const mongoose = require('mongoose');

// const dev_db_url =
//   "mongodb+srv://dbuser:admin@cluster0.afn1qa6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const url = "mongodb+srv://dbuser:admin@cluster0.afn1qa6.mongodb.net/"

// mongoose.connect(dev_db_url);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// module.exports = mongoose;

const bucket = admin.storage().bucket();
const db = admin.firestore();

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
