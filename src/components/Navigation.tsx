import React from 'react';
import { Link } from 'react-router-dom';
import { Hand, BookOpen, Users, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Hand className="h-8 w-8 text-[#3498DB]" />
            </motion.div>
            <span className="font-bold text-xl group-hover:text-[#3498DB] transition-colors">Guesture Talk</span>
          </Link>
          
          <div className="flex space-x-8">
            <NavLink to="/translator" icon={Hand}>Translator</NavLink>
            <NavLink to="/learning-hub" icon={BookOpen}>Learning Hub</NavLink>
            <NavLink to="/community" icon={Users}>Community</NavLink>
            <NavLink to="/profile" icon={User}>Profile</NavLink>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-1 hover:text-[#3498DB] transition-colors group"
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Icon className="h-5 w-5 group-hover:text-[#3498DB]" />
      </motion.div>
      <span>{children}</span>
    </Link>
  );
}