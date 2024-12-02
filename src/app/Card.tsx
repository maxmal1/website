'use client';

import React from 'react';
import './Card.scss';

interface CardProps {
  image: string;
  title: string;
  content: string;
  buttonLabel: string;
  buttonLink: string;
}

const Card: React.FC<CardProps> = ({ 
  image, 
  title, 
  content, 
  buttonLabel, 
  buttonLink 
}) => {
  const handleButtonClick = () => {
    window.open(buttonLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="card"
      style={
        {
          '--card-background': `url(${image})`,
        } as React.CSSProperties
      }
    >
      <div className="content">
        <h3 className="title">{title}</h3>
        <p className="copy">{content}</p>
        <button 
          className="btn" 
          onClick={handleButtonClick}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Card;
