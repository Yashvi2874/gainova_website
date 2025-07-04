import React, { useState, useEffect } from 'react';
import icon from './../../public/images/Pages/Icon_nobg.svg'; // Adjust the path as necessary

const Loading = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gainova-lightmode");
    if (stored !== null) setIsLightMode(stored === "true");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + Math.random() * 15;
        if (nextProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete && onLoadingComplete(), 500);
          return 100;
        }
        return nextProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const loadingStyles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: isLightMode 
        ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        : 'linear-gradient(135deg, #242423 0%, #1a1a1a 100%)',
      zIndex: 9999,
      transition: 'opacity 0.5s ease-out'
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    logo: {
      width: '120px',
      height: '120px',
      marginBottom: '1rem',
      animation: 'float 3s ease-in-out infinite'
    },
    text: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: isLightMode ? '#242423' : '#d4be69',
      marginBottom: '2rem',
      fontFamily: "'Garet', sans-serif"
    },
    progressBar: {
      width: '300px',
      height: '4px',
      backgroundColor: isLightMode ? '#e0e0e0' : '#333',
      borderRadius: '2px',
      overflow: 'hidden',
      marginBottom: '1rem'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #ff914d, #d4be69)',
      borderRadius: '2px',
      transition: 'width 0.3s ease',
      width: `${progress}%`
    },
    percentage: {
      fontSize: '1rem',
      color: isLightMode ? '#666' : '#ccc',
      fontFamily: "'Livvic', sans-serif"
    }
  };

  return (
    <div style={loadingStyles.container}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <div style={loadingStyles.logoContainer}>
        <img
          src={isLightMode ? icon : icon}
          alt="GAINOVA Logo"
          style={loadingStyles.logo}
        />
      </div>
      <div style={loadingStyles.progressBar}>
        <div style={loadingStyles.progressFill}></div>
      </div>
      <div style={loadingStyles.percentage}>{Math.round(progress)}%</div>
    </div>
  );
};

export default Loading;