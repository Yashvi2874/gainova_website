// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/AboutPage';
import TeamsPage from './components/TeamsPage';
import PodcastPage from './components/PodcastPage';
import FeaturesPage from './components/FeaturesPage';
import Navbar from './components/Navbar/Navbar';

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

  return (
    <Router>
      <Navbar isLightMode={isLightMode} toggleLightMode={toggleLightMode} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/features" element={<FeaturesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
