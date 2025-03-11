import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hand, BookOpen, Users, User, Menu, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg fixed w-full z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Hand className="h-8 w-8 text-violet-200" />
            </motion.div>
            <span className="font-bold text-xl group-hover:text-violet-200 transition-colors">Guesture Talk</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/translator" icon={Hand}>Translator</NavLink>
            <NavLink to="/learning-hub" icon={BookOpen}>Learning Hub</NavLink>
            <NavLink to="/community" icon={Users}>Community</NavLink>
            <NavLink to="/about-sign-language" icon={Info}>About</NavLink>
            <NavLink to="/profile" icon={User}>Profile</NavLink>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-b from-violet-600 to-indigo-600">
              <MobileNavLink to="/translator" icon={Hand} onClick={() => setIsOpen(false)}>
                Translator
              </MobileNavLink>
              <MobileNavLink to="/learning-hub" icon={BookOpen} onClick={() => setIsOpen(false)}>
                Learning Hub
              </MobileNavLink>
              <MobileNavLink to="/community" icon={Users} onClick={() => setIsOpen(false)}>
                Community
              </MobileNavLink>
              <MobileNavLink to="/about-sign-language" icon={Info} onClick={() => setIsOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink to="/profile" icon={User} onClick={() => setIsOpen(false)}>
                Profile
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-1 hover:text-violet-200 transition-colors group min-h-[44px]"
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Icon className="h-5 w-5 group-hover:text-violet-200" />
      </motion.div>
      <span>{children}</span>
    </Link>
  );
}

function MobileNavLink({ 
  to, 
  icon: Icon, 
  children, 
  onClick 
}: { 
  to: string; 
  icon: any; 
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-white hover:bg-violet-700 transition-colors min-h-[44px]"
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
}