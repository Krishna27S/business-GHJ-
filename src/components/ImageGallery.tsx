// src/components/ImageGallery.tsx
import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    '/images/poster1.jpg',
    '/images/poster2.jpg',
    '/images/poster3.jpg',
    '/images/poster4.jpg',
    '/images/poster5.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      {/* Main Image Container */}
      <div className="w-full h-[600px] relative rounded-lg overflow-hidden">
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          <button
            onClick={prevImage}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;