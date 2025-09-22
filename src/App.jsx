// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/AboutPage';
import TeamsPage from './components/TeamsPage';
// import PodcastPage from './components/PodcastPage';
import FeaturesPage from './components/FeaturesPage';
import Navbar from './components/Navbar/Navbar';
import Loading from './components/loading.jsx';
// import Contact from './components/contact/ContactUs';

const App = () => {
  // Light/Dark mode state
  const [isLightMode, setIsLightMode] = useState(() => {
    // Get initial mode from localStorage or default to false (dark)
    const stored = localStorage.getItem('gainova-lightmode');
    return stored ? stored === 'true' : false;
  });

  // Update body class and localStorage on mode change
  useEffect(() => {
    document.body.classList.toggle('light-mode', isLightMode);
    document.body.classList.toggle('dark-mode', !isLightMode);
    localStorage.setItem('gainova-lightmode', isLightMode);
  }, [isLightMode]);

  // Toggle function
  const toggleLightMode = () => setIsLightMode((prev) => !prev);

  const [footerVisible, setFooterVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <Router>
      {!footerVisible && (
        <Navbar isLightMode={isLightMode} toggleLightMode={toggleLightMode} />
      )}
      <ScrollToHeroSection />
      <Routes>
        <Route element={<Layout setFooterVisible={setFooterVisible} />}>
          <Route path="/" element={<HomePage isLightMode={isLightMode} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          {/* <Route path="/podcast" element={<PodcastPage />} /> */}
          <Route path="/features" element={<FeaturesPage />} />
          {/* <Route path="/contact_us" element={<Contact />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function ScrollToHeroSection() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Map route to hero section id
    const sectionMap = {
      "/": "home",
      "/about": "about-hero",
      "/teams": "teams-hero",
      // "/podcast": "podcast-hero",
      "/features": "features-hero",
    };
    const sectionId = sectionMap[pathname];
    if (sectionId) {
      const hero = document.getElementById(sectionId);
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default App;