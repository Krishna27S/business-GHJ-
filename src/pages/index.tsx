import React from 'react';
import ImageGallery from '../components/ImageGallery';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to YourBrand</h1>
        <ImageGallery />
      </main>
    </div>
  );
};

export default HomePage;