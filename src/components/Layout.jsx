import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './contact/ContactUs';
import useFooterVisible from './contact/useFooterVisible';

const Layout = ({ setFooterVisible }) => {
  const footerRef = useRef(null);
  const footerVisible = useFooterVisible(footerRef);

  // Make the ref available globally for Navbar (if needed)
  window.gainovaFooterRef = footerRef;

  // Optionally, pass the visibility up to App
  if (setFooterVisible) setFooterVisible(footerVisible);

  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet context={{ footerVisible }} />
      </main>
      <Footer ref={footerRef} />
    </div>
  );
};

export default Layout;
