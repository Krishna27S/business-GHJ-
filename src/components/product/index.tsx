/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/products/index.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters';
import { collection, getDocs, query, where, QuerySnapshot, DocumentData, CollectionReference } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;
  category: string;
  metalType: string;
  imageUrl: string;
}

const ProductsPage = () => {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    category: '',
    type: '',
    priceRange: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsRef = collection(db, 'products') as CollectionReference<DocumentData>;

        let querySnapshot;
        if (category) {
          const q = query(productsRef, 
            where('category', '==', category.toString().toUpperCase())
          );
          querySnapshot = await getDocs(q);
        } else {
          querySnapshot = await getDocs(productsRef);
        }

        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
          {category?.toString().replace(/-/g, ' ') || 'All Products'}
          {subcategory && ` - ${subcategory.toString().replace(/-/g, ' ')}`}
        </h1>

        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <ProductFilters 
              onFilterChange={handleFilterChange}
              activeFilters={filters}
            />
          </div>

          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <p className="text-red-600 font-medium">₹{product.price.toLocaleString()}</p>
                      <p className="text-gray-600">Weight: {product.weight}</p>
                      <p className="text-gray-600">Category: {product.category}</p>
                      <p className="text-gray-600">Metal: {product.metalType}</p>
                      <button 
                        className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;