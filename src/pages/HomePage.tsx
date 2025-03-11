import React from 'react';
import { motion } from 'framer-motion';
import { Hand, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center pt-20 pb-16 relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30 -z-10"
        />
        
        <motion.h1 
          variants={itemVariants}
          className="text-6xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-transparent bg-clip-text mb-6"
        >
          Guesture Talk
        </motion.h1>
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-semibold text-[#2C3E50] mb-4"
        >
          Sign Language Made Easy
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Break down communication barriers with real-time sign language detection and learning tools.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 transform hover:shadow-2xl transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
              <Hand className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C3E50]">Real-time Translation</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">Experience instant sign language translation powered by advanced AI technology.</p>
            <Link to="/translator" className="inline-block bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Try Now
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 transform hover:shadow-2xl transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C3E50]">Learning Hub</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">Access comprehensive learning materials and interactive lessons for all skill levels.</p>
            <Link to="/learning-hub" className="inline-block bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Start Learning
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 transform hover:shadow-2xl transition-all duration-300"
          >
            <div className="bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-[#2C3E50]">Community</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">Join our vibrant community of learners and share your journey with others.</p>
            <Link to="/community" className="inline-block bg-gradient-to-r from-[#3498DB] to-[#2980B9] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Join Now
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-20 bg-gradient-to-b from-[#ECF0F1] to-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-[#2C3E50] to-[#3498DB] text-transparent bg-clip-text mb-8">
            Start Your Journey Today
          </h2>
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/learning-hub" className="inline-block bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;