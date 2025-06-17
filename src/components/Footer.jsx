import React from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { href: "https://instagram.com", icon: <FaInstagram /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">©GAINOVA 2025. All rights reserved</p>

        <div className="social-links">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a href="#privacy-policy" className="privacy-policy">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
