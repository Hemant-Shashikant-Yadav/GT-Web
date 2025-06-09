import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Hand, BookOpen, Users, User, Menu, X, Info, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

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
            <span className="font-bold text-xl group-hover:text-violet-200 transition-colors">
              Guesture Talk
            </span>
          </Link>

          {/* User Info & Mobile menu button */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-semibold">{user.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            )}
            
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
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/translator" icon={Hand}>
              Translator
            </NavLink>
            <NavLink to="/traslate-img" icon={Hand}>
              Translate Image
            </NavLink>
            <NavLink to="/community" icon={Users}>
              Community
            </NavLink>
            <NavLink to="/about-sign-language" icon={Info}>
              About
            </NavLink>
            <NavLink to="/profile" icon={User}>
              Profile
            </NavLink>
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-violet-200 transition-colors group min-h-[44px] text-red-200 hover:text-red-100"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <LogOut className="h-5 w-5" />
                </motion.div>
                <span>Logout</span>
              </button>
            )}
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
              {user && (
                <div className="flex items-center gap-3 px-3 py-3 border-b border-violet-500/30 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold">{user.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-violet-200">{user.email}</div>
                  </div>
                </div>
              )}
              
              <MobileNavLink
                to="/translator"
                icon={Hand}
                onClick={() => setIsOpen(false)}
              >
                Translator
              </MobileNavLink>
              <MobileNavLink
                to="/traslate-img"
                icon={Hand}
                onClick={() => setIsOpen(false)}
              >
                Translate Image
              </MobileNavLink>
              <MobileNavLink
                to="/community"
                icon={Users}
                onClick={() => setIsOpen(false)}
              >
                Community
              </MobileNavLink>
              <MobileNavLink
                to="/about-sign-language"
                icon={Info}
                onClick={() => setIsOpen(false)}
              >
                About
              </MobileNavLink>
              <MobileNavLink
                to="/profile"
                icon={User}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </MobileNavLink>
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-red-200 hover:bg-violet-700 transition-colors min-h-[44px] text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: any;
  children: React.ReactNode;
}) {
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
  onClick,
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