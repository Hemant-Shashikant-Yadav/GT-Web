import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Navigation } from "./components/Navigation";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { LoadingScreen } from "./components/LoadingScreen";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { AnimatePresence } from "framer-motion";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Translator = React.lazy(() => import("./pages/Translator"));
const TranslateImage = React.lazy(() => import("./pages/TranslateImage"));
const Community = React.lazy(() => import("./pages/Community"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AboutSignLanguage = React.lazy(() => import("./pages/AboutSignLanguage"));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user) {
    return <Navigate to="/auth\" replace />;
  }
  
  return <>{children}</>;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-slate-50">
          <Navigation />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<Navigate to="/\" replace />} />
              <Route 
                path="/translator" 
                element={
                  <ProtectedRoute>
                    <Translator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/traslate-img" 
                element={
                  <ProtectedRoute>
                    <TranslateImage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/community" 
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about-sign-language" element={<AboutSignLanguage />} />
            </Routes>
          </Suspense>
        </div>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;