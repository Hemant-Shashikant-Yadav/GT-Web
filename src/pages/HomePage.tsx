import React from "react";
import { motion } from "framer-motion";
import { Hand, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50">
      <div className="h-16"></div> {/* Spacer for fixed navbar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center pt-20 pb-16 px-4 relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-r from-violet-100/30 to-indigo-100/30 -z-10"
        />

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text mb-6"
        >
          Guesture Talk
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl font-semibold text-violet-900 mb-4"
        >
          Sign Language Made Easy
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4"
        >
          Break down communication barriers with real-time sign language
          detection and learning tools.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <FeatureCard
            icon={Hand}
            title="Real-time Translation"
            description="Experience instant sign language translation powered by advanced AI technology."
            link="/translator"
            linkText="Try Now"
          />

          <FeatureCard
            icon={Hand}
            title="Translate Image"
            description="Access comprehensive learning materials and interactive lessons for all skill levels."
            link="/traslate-img"
            linkText="Start Learning"
          />

          <FeatureCard
            icon={Users}
            title="Community"
            description="Join our vibrant community of learners and share your journey with others."
            link="/community"
            linkText="Join Now"
          />
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  link,
  linkText,
}: {
  icon: any;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-violet-100 transform hover:shadow-2xl transition-all duration-300"
    >
      <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full p-3 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-6">
        <Icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
      </div>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-violet-900">
        {title}
      </h2>
      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
      <Link
        to={link}
        className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 min-h-[44px] text-center"
      >
        {linkText}
      </Link>
    </motion.div>
  );
}

export default HomePage;
