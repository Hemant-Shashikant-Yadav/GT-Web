import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left text-white"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Hand className="h-16 w-16 text-violet-200" />
              </motion.div>
              <h1 className="text-4xl font-bold ml-4">Gesture Talk</h1>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Connect Through Sign Language
            </h2>
            
            <p className="text-xl text-violet-100 mb-8 leading-relaxed">
              Join our professional community where communication knows no barriers. 
              Learn, share, and grow together in the world of sign language.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Real-time Translation</h3>
                <p className="text-sm text-violet-100">
                  Advanced AI-powered sign language detection and translation
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Professional Network</h3>
                <p className="text-sm text-violet-100">
                  Connect with professionals and learners worldwide
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Auth Forms */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm 
                  key="login"
                  onSwitchToRegister={() => setIsLogin(false)} 
                />
              ) : (
                <RegisterForm 
                  key="register"
                  onSwitchToLogin={() => setIsLogin(true)} 
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}