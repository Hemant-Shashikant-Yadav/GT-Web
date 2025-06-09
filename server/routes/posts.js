import express from 'express';
import { body, validationResult } from 'express-validator';
import Post from '../models/Post.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, author } = req.query;
    const query = { isPublic: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (author) {
      query.author = author;
    }

    const posts = await Post.find(query)
      .populate('author', 'name avatar jobTitle company')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new post
router.post('/', authenticateToken, [
  body('content').trim().isLength({ min: 1, max: 2000 }).withMessage('Content must be between 1-2000 characters'),
  body('category').optional().isIn(['Technical', 'Professional', 'Industry News', 'General'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, category = 'General', tags = [], images = [] } = req.body;

    // Upload images to Cloudinary if provided
    const uploadedImages = [];
    if (images && images.length > 0) {
      for (const image of images) {
        if (image.startsWith('data:')) {
          try {
            const uploadResult = await uploadToCloudinary(image, 'posts');
            uploadedImages.push(uploadResult.secure_url);
          } catch (uploadError) {
            console.error('Image upload error:', uploadError);
          }
        } else {
          uploadedImages.push(image);
        }
      }
    }

    const post = new Post({
      author: req.userId,
      content,
      category,
      tags: tags.slice(0, 10), // Limit to 10 tags
      images: uploadedImages
    });

    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name avatar jobTitle company');

    res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/unlike post
router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = post.likes.find(like => like.user.toString() === req.userId);
    
    if (existingLike) {
      // Unlike
      post.likes = post.likes.filter(like => like.user.toString() !== req.userId);
    } else {
      // Like
      post.likes.push({ user: req.userId });
    }

    await post.save();
    res.json({ message: 'Post updated', likesCount: post.likes.length });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add comment
router.post('/:id/comment', authenticateToken, [
  body('content').trim().isLength({ min: 1, max: 500 }).withMessage('Comment must be between 1-500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.userId,
      content: req.body.content
    });

    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('comments.user', 'name avatar');

    res.json({
      message: 'Comment added successfully',
      comments: updatedPost.comments
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;