// src/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: String,
    content: String,
    likes: Number,
    lat: Number,
    leg: Number,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
