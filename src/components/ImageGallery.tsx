import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    '/images/poster1.jpg',
    '/images/poster2.jpg',
    '/images/poster3.jpg',
    '/images/poster4.jpg',
    '/images/poster5.jpg',
    // Add more images as needed
  ];

  // Auto scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="mt-8 relative bg-[#FAF3E3] p-6 rounded-lg shadow-lg">
      {/* Main Image Container */}
      <div className="w-full h-[600px] relative rounded-lg overflow-hidden shadow-lg">
        {/* Image with transition */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
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
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          <button
            onClick={prevImage}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Optional: Thumbnail Navigation */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;