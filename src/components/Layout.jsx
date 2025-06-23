import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './contact/ContactUs';

const Layout = () => {
  const footerRef = useRef(null);

  // Make the ref available globally for Navbar
  window.gainovaFooterRef = footerRef;

  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet />
      </main>
      <Footer ref={footerRef} />
    </div>
  );
};

export default Layout;
