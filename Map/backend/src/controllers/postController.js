// // postController.js

// const Post = require('../models/post');

// exports.getAllPosts = async (req, res) => {
//   // Implement logic to fetch all posts
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.getPostById = async (req, res) => {
//   // Implement logic to fetch a post by ID
//   try {
//     const postId = req.params.postId;
//     const post = await Post.findById(postId);
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.createPost = async (req, res) => {
//   // Implement logic to create a new post
//   try {
//     const { id, content, likes, lat, leg} = req.body;
//     const newPost = new Post({ id, content, likes, lat, leg });
//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.updatePost = async (req, res) => {
//   // Implement logic to update a post
//   try {
//     const postId = req.params.postId;
//     const { id, content, likes, lat, leg } = req.body;

//     const updatedPost = await Post.findByIdAndUpdate(postId, { id, content, likes, lat, leg }, { new: true });

//     if (!updatedPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.deletePost = async (req, res) => {
//   // Implement logic to delete a post
//   try {
//     const postId = req.params.postId;
//     const deletedPost = await Post.findByIdAndDelete(postId);

//     if (!deletedPost) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // Add other post-related functions as needed



const admin = require('firebase-admin');
const serviceAccount = require('path/to/your/firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-firebase-database-url.firebaseio.com',
});

const db = admin.firestore();

const postsCollection = db.collection('posts');

exports.getAllPosts = async (req, res) => {
  try {
    const snapshot = await postsCollection.get();
    const posts = [];

    snapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const postDoc = await postsCollection.doc(postId).get();

    if (!postDoc.exists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = { id: postDoc.id, ...postDoc.data() };
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content, likes, lat, leg } = req.body;
    const newPostRef = await postsCollection.add({ content, likes, lat, leg });
    const newPost = await newPostRef.get();

    res.status(201).json({ id: newPost.id, ...newPost.data() });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, likes, lat, leg } = req.body;

    const postRef = postsCollection.doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await postRef.update({ content, likes, lat, leg });
    const updatedPost = await postRef.get();

    res.json({ id: updatedPost.id, ...updatedPost.data() });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const postRef = postsCollection.doc(postId);
    const deletedPost = await postRef.get();

    if (!deletedPost.exists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await postRef.delete();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
