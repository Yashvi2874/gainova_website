// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import TeamsPage from './components/TeamsPage';
import PodcastPage from './components/PodcastPage';
import FeaturesPage from './components/FeaturesPage';

const App = () => {
  return (
    <Router>
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
