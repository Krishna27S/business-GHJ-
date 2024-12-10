/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/products/index.tsx
import React from 'react';
import { useRouter } from 'next/router';

const ProductsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>
        {/* Add your product grid here */}
      </main>
    </div>
  );
};

export default ProductsPage;