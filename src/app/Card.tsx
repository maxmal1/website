'use client';

import React from 'react';
import Link from 'next/link';
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
  const isExternalLink = (url: string) => {
    try {
      const link = new URL(url);
      return link.origin !== window.location.origin;
    } catch {
      // If the URL constructor fails, treat it as an internal link
      return false;
    }
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
        {isExternalLink(buttonLink) ? (
          <button 
            className="btn" 
            onClick={() => window.open(buttonLink, '_blank', 'noopener,noreferrer')}
          >
            {buttonLabel}
          </button>
        ) : (
          <Link href={buttonLink} className="btn">
            {buttonLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
