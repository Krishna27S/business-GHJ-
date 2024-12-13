import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs, query, where } from 'firebase/firestore';
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
  const { category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Attempting to fetch products...');
        let productsQuery;

        if (category) {
          productsQuery = query(
            collection(db, 'products'),
            where('category', '==', category.toString().toUpperCase())
          );
        } else {
          productsQuery = collection(db, 'products');
        }

        const querySnapshot = await getDocs(productsQuery);
        console.log('Products found:', querySnapshot.size);

        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Product));

        console.log('Processed products:', fetchedProducts);
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {category ? category.toString().replace(/-/g, ' ') : 'All Jewellery'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products available at the moment.</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {product.imageUrl && (
                  <div className="aspect-w-1 aspect-h-1">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-image.jpg'; // Add a placeholder image
                      }}
                    />
                  </div>
                )}
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
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;