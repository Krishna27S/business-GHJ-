import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  weight: string;
  category: string;
  metalType: string;
}

const ProductCard = ({ image, title, price, weight, category, metalType }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-red-600 font-bold">₹{price.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Weight: {weight}</p>
          <p className="text-sm text-gray-600">Category: {category}</p>
          <p className="text-sm text-gray-600">Metal: {metalType}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;