// src/pages/index.tsx
import React, { useState } from 'react';
import ImageGallery from '../components/ImageGallery';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

// Sample product data structure
const sampleProducts = [
  {
    id: 1,
    image: '/images/diamond1.jpg',
    title: 'Diamond Ring',
    price: 25000,
    weight: '3.5g',
    category: 'Rings',
    metalType: 'Gold'
  },
  {
    id: 2,
    image: '/images/necklace.jpg',
    title: 'Necklaces',
    price: 25000,
    weight: '3.5g',
    category: 'Rings',
    metalType: 'Gold'
  },
  {
    id: 3,
    image: '/images/diamond1.jpg',
    title: 'Earrings',
    price: 25000,
    weight: '3.5g',
    category: 'Rings',
    metalType: 'Gold'
  },
  {
    id: 4,
    image: '/images/diamond1.jpg',
    title: 'Bracelets',
    price: 25000,
    weight: '3.5g',
    category: 'Rings',
    metalType: 'Gold'
  },
  {
    id: 5,
    image: '/images/diamond1.jpg',
    title: 'Diamond Ring',
    price: 25000,
    weight: '3.5g',
    category: 'Rings',
    metalType: 'Gold'
  },
  {
    id: 6,
    image: '/images/diamond1.jpg',
    title: 'Diamond Ring',
    price: 25000,
    weight: '3.5g',
    category: 'Rings',
    metalType: 'Gold'
  },
];

const HomePage = () => {
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    priceRange: ''
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Ginni House
          </Link>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link 
                href="/admin/dashboard" 
                className="text-red-600 hover:text-red-700"
              >
                Admin Dashboard
              </Link>
            )}
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Gallery */}
      <div className="w-full bg-white shadow-sm mb-8">
        <div className="max-w-7xl mx-auto">
          <ImageGallery />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Ginni House</h1>
        
        {/* Products Section */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <ProductFilters 
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>

            {/* "Show More" Button */}
            <div className="mt-8 text-center">
              <button 
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Show More Products
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Featured Categories */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Gold', 'Diamond', 'Silver', 'Platinum'].map((category) => (
              <div 
                key={category}
                className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                <p className="text-gray-600 mt-2">Explore {category} Collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Store</h2>
          <p className="text-gray-600 mb-6">Experience our collection in person at our store</p>
          <a 
            href="https://www.google.com/maps/place/Ginni+house+jewellers/@26.1216362,85.8956459,19.46z"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-red-600 hover:text-red-700"
          >
            <span>Find Store Location</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p>Phone: +1234567890</p>
              <p>Email: info@ginnihouse.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-red-400">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-red-400">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-red-400">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-red-400">Facebook</a>
                <a href="#" className="hover:text-red-400">Instagram</a>
                <a href="#" className="hover:text-red-400">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>© {new Date().getFullYear()} Ginni House Jewellers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;