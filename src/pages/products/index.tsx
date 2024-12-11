// src/pages/products/index.tsx
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData.sort((a, b) => b.price - a.price));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Jewellery</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative pb-[100%]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h2>
                <p className="text-red-600 font-medium text-lg mb-2">₹{product.price.toLocaleString()}</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Weight: {product.weight}</p>
                  <p className="text-sm text-gray-600">Category: {product.category}</p>
                  <p className="text-sm text-gray-600">Metal: {product.metalType}</p>
                </div>
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
  );
};

export default ProductsPage;