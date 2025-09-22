import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = true, 
  glassEffect = true,
  ...props 
}) => {
  const baseClasses = 'card';
  const hoverClasses = hoverEffect ? 'card-hover' : '';
  const glassClasses = glassEffect ? 'card-glass' : '';
  
  const cardClasses = `${baseClasses} ${hoverClasses} ${glassClasses} ${className}`.trim();
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;