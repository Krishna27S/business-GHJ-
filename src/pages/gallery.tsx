import React from 'react';

const GalleryPage = () => {
  // You'll add your images to the public/images directory
  // and reference them like this
  const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    // Add more images as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Photo Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div key={index} className="aspect-square relative">
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;