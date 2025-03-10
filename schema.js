const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  commentedAt: { type: Date, default: Date.now },
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, unique: true, minlength: 5, required: true },
  content: { type: String, minlength: 50, required: true },
  author: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: String, default: 'General' },
  likes: { type: [String], default: [] },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// Middleware to update 'updatedAt' on modification
blogPostSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
