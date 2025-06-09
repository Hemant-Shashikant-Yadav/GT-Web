import React, { useState } from "react";
import { Heart, MessageCircle, Share2, Image } from "lucide-react";

function Community() {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;

    const newPost: PostType = {
      id: posts.length + 1,
      user: {
        name: "Current User",
        avatar: "https://randomuser.me/api/portraits/men/99.jpg", // Replace with the current user's avatar
      },
      time: "Just now",
      content: newPostContent,
      image: newPostImage,
      reactions: { likes: 0, comments: 0, shares: 0 },
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostImage(null);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#2C3E50] mb-8">Community</h1>

        {/* Create Post Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/99.jpg"
              alt="Current User"
              className="w-12 h-12 rounded-full mr-4"
            />
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          </div>
          {newPostImage && (
            <div className="mb-4">
              <img
                src={newPostImage}
                alt="Preview"
                className="rounded-lg w-full object-cover mb-2"
              />
              <button
                className="text-red-500 text-sm"
                onClick={() => setNewPostImage(null)}
              >
                Remove Image
              </button>
            </div>
          )}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Image className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">Add Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.result)
                        setNewPostImage(reader.result as string);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Post({ post }: { post: PostType }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="font-bold text-lg">{post.user.name}</h2>
          <p className="text-sm text-gray-500">{post.time}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post content"
          className="rounded-lg w-full object-cover mb-4"
        />
      )}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
          <Heart className="w-5 h-5" />
          <span>{post.reactions.likes}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
          <MessageCircle className="w-5 h-5" />
          <span>{post.reactions.comments}</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
          <Share2 className="w-5 h-5" />
          <span>{post.reactions.shares}</span>
        </button>
        <button className="text-blue-500 hover:underline text-sm">
          View Comments
        </button>
      </div>
    </div>
  );
}

const dummyPosts: PostType[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    time: "2 hours ago",
    content: "Loving the new features of Gesture Talk! 🚀",
    image:
      "https://ai2-s2-public.s3.amazonaws.com/figures/2017-08-08/0151c4b5811ae60014a06f328081b8a6098c4fb3/2-Figure1-1.png",
    reactions: { likes: 120, comments: 45, shares: 10 },
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar:
        "https://itsdatalytical.files.wordpress.com/2023/08/5f3069_ab74cada5f98479cb613e3ea8b4bd3d7mv2.png",
    },
    time: "5 hours ago",
    content:
      "Just attended a workshop on sign language. Highly recommend it! ✨",
    image: null,
    reactions: { likes: 85, comments: 20, shares: 5 },
  },
  {
    id: 3,
    user: {
      name: "Emily Johnson",
      avatar:
        "https://itsdatalytical.files.wordpress.com/2023/08/5f3069_ab74cada5f98479cb613e3ea8b4bd3d7mv2.png",
    },
    time: "1 day ago",
    content: "Here’s a snapshot from our community meetup. Great vibes! 🌟",
    image:
      "https://itsdatalytical.files.wordpress.com/2023/08/5f3069_ab74cada5f98479cb613e3ea8b4bd3d7mv2.png",
    reactions: { likes: 200, comments: 60, shares: 25 },
  },
];

type PostType = {
  id: number;
  user: { name: string; avatar: string };
  time: string;
  content: string;
  image: string | null;
  reactions: { likes: number; comments: number; shares: number };
};

export default Community;
