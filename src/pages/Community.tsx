import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Image, Send, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  author: {
    _id: string;
    name: string;
    avatar: string;
    jobTitle?: string;
    company?: string;
  };
  content: string;
  images: string[];
  category: string;
  tags: string[];
  likes: Array<{ user: string; createdAt: Date }>;
  comments: Array<{
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: Date;
  }>;
  shares: Array<{ user: string; createdAt: Date }>;
  createdAt: Date;
}

function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [newPostImages, setNewPostImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const categories = ["Technical", "Professional", "Industry News", "General"];

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/posts', {
        params: { category: selectedCategory }
      });
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async () => {
    if (!newPostContent.trim()) return;

    try {
      const response = await axios.post('/posts', {
        content: newPostContent,
        category: newPostCategory,
        images: newPostImages
      });

      setPosts([response.data.post, ...posts]);
      setNewPostContent("");
      setNewPostImages([]);
      setNewPostCategory("General");
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Failed to create post');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          setNewPostImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await axios.post(`/posts/${postId}/like`);
      
      setPosts(posts.map(post => {
        if (post._id === postId) {
          const isLiked = post.likes.some(like => like.user === user?._id);
          return {
            ...post,
            likes: isLiked 
              ? post.likes.filter(like => like.user !== user?._id)
              : [...post.likes, { user: user?._id || '', createdAt: new Date() }]
          };
        }
        return post;
      }));
    } catch (error) {
      console.error('Failed to like post:', error);
      toast.error('Failed to like post');
    }
  };

  const handleComment = async (postId: string) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;

    try {
      const response = await axios.post(`/posts/${postId}/comment`, { content });
      
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return {
            ...post,
            comments: response.data.comments
          };
        }
        return post;
      }));

      setCommentInputs({ ...commentInputs, [postId]: '' });
      toast.success('Comment added!');
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text mb-8 text-center">
            Community
          </h1>

          {/* Category Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Create Post */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-semibold text-violet-600">
                    {user?.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={3}
                />
                
                {newPostImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {newPostImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt="Preview"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setNewPostImages(newPostImages.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-violet-600">
                  <Image className="w-5 h-5" />
                  <span>Add Images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handlePostSubmit}
                disabled={!newPostContent.trim()}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                {/* Post Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold text-violet-600">
                        {post.author.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{post.author.name}</h3>
                    {post.author.jobTitle && (
                      <p className="text-sm text-slate-600">
                        {post.author.jobTitle}
                        {post.author.company && ` at ${post.author.company}`}
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <p className="text-slate-700 mb-4 leading-relaxed">{post.content}</p>

                {/* Post Images */}
                {post.images.length > 0 && (
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Post content"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 py-3 border-t border-slate-100">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center gap-2 transition-colors ${
                      post.likes.some(like => like.user === user?._id)
                        ? "text-red-500"
                        : "text-slate-600 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${
                      post.likes.some(like => like.user === user?._id) ? "fill-current" : ""
                    }`} />
                    <span>{post.likes.length}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 text-slate-600 hover:text-green-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>{post.shares.length}</span>
                  </button>
                </div>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                        <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
                          {comment.user.avatar ? (
                            <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-sm font-semibold text-violet-600">
                              {comment.user.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-slate-800">{comment.user.name}</span>
                            <span className="text-xs text-slate-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold text-violet-600">
                        {user?.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[post._id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
                      onKeyPress={(e) => e.key === 'Enter' && handleComment(post._id)}
                      className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                      onClick={() => handleComment(post._id)}
                      disabled={!commentInputs[post._id]?.trim()}
                      className="bg-violet-600 text-white p-2 rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No posts found. Be the first to share something!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Community;