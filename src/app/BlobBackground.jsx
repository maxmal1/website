import React, { useState, useEffect } from 'react';

const BlobBackground = () => {
  const [dimensions, setDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1000, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1000 
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full overflow-hidden"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1 
      }}
    >
      {/* Solid Background */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a202c', // Solid background color (dark gray/navy tone)
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />

      {/* SVG Blob Container */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={dimensions.width}
        height={dimensions.height}
        className="absolute top-0 left-0"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        {/* Gaussian Blur Filter */}
        <defs>
          <filter id="gooey" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
              result="goo" 
            />
          </filter>

          {/* Gradient for Blobs */}
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#ff7eb3", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#65c7f7", stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Mask with Gradient Blobs */}
        <mask id="mask" x="0" y="0">
          <g style={{ filter: 'url(#gooey)' }}>
            {[
              { cx: 10, cy: 10, r: 80 },
              { cx: 50, cy: 10, r: 40 },
              { cx: 17, cy: 15, r: 70 },
              { cx: 90, cy: 20, r: 120 },
              { cx: 30, cy: 25, r: 30 },
              { cx: 50, cy: 60, r: 80 },
              { cx: 70, cy: 90, r: 10 },
              { cx: 90, cy: 60, r: 90 },
              { cx: 30, cy: 90, r: 80 },
              { cx: 10, cy: 10, r: 80 },
              { cx: 50, cy: 10, r: 20 },
              { cx: 17, cy: 15, r: 70 },
              { cx: 40, cy: 20, r: 120 },
              { cx: 30, cy: 25, r: 30 },
              { cx: 80, cy: 60, r: 80 },
              { cx: 17, cy: 10, r: 100 },
              { cx: 40, cy: 60, r: 90 },
              { cx: 10, cy: 50, r: 80 }
            ].map((blob, index) => (
              <circle 
                key={index} 
                className={`blob blob-${index + 1}`}
                cx={`${blob.cx}%`} 
                cy={`${blob.cy}%`} 
                r={blob.r} 
                fill="white"
              />
            ))}
          </g>
        </mask>

        {/* Gradient Blobs */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#blobGradient)" 
          mask="url(#mask)" 
        />
      </svg>

      {/* Dynamic Blob Animations */}
      <style jsx>{`
        ${[...Array(18)].map((_, i) => `
          .blob-${i + 1} {
            animation: move${i + 1} 20s infinite linear;
          }
          @keyframes move${i + 1} {
            from {
              transform: rotate(${(i + 1) * 90}deg) translate(200px, 0.1px) rotate(-${(i + 1) * 90}deg);
            }
            to {
              transform: rotate(${(i + 1) * 90 + 360}deg) translate(200px, 0.1px) rotate(-${(i + 1) * 90 + 360}deg);
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};

export default BlobBackground;
