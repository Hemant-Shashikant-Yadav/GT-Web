import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { LoadingScreen } from "./components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Translator = React.lazy(() => import("./pages/Translator"));
const TranslateImage = React.lazy(() => import("./pages/TranslateImage"));
const Community = React.lazy(() => import("./pages/Community"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AboutSignLanguage = React.lazy(() => import("./pages/AboutSignLanguage"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <div className="min-h-screen bg-slate-50">
            <Navigation />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/translator" element={<Translator />} />
                <Route path="/traslate-img" element={<TranslateImage />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/about-sign-language"
                  element={<AboutSignLanguage />}
                />
              </Routes>
            </Suspense>
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
