import React, { useState } from "react";
import { motion } from "framer-motion";

function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Passionate about sign language and inclusive communication.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [editProfile, setEditProfile] = useState(profile);

  const handleEditSubmit = () => {
    setProfile(editProfile);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-[#2C3E50] mb-8 text-center">
          Profile
        </h1>

        {/* Profile Card */}
        <div className="flex items-center space-x-8">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600 text-lg">{profile.email}</p>
            <p className="text-gray-700 mt-4">{profile.bio}</p>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editProfile.name}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editProfile.email}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Bio
                </label>
                <textarea
                  value={editProfile.bio}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, bio: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={editProfile.avatar}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, avatar: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Profile;
