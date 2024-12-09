import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters';

// Sample product data - replace with your actual data
const sampleProducts = [
  {
    id: 1,
    image: '/images/product1.jpg',
    title: 'Diamond Ring',
    price: 25000,
    weight: '3.5g',
    category: 'Rings',
    metalType: 'Gold'
  },
  // Add more sample products
];

const ProductsPage = () => {
  const router = useRouter();
  const { category, subcategory } = router.query;

  const [filters, setFilters] = useState({
    category: '',
    type: '',
    priceRange: ''
  });

  // Update filters when URL parameters change
  useEffect(() => {
    if (category) {
      setFilters(prev => ({
        ...prev,
        category: String(category)
      }));
    }
  }, [category]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
          {category?.toString().replace(/-/g, ' ') || 'All Products'}
          {subcategory && ` - ${subcategory.toString().replace(/-/g, ' ')}`}
        </h1>

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

            {/* Show More Button */}
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
    </div>
  );
};

export default ProductsPage;