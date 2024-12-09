import React from 'react';

interface FilterProps {
  onFilterChange: (filterType: string, value: string) => void;
  activeFilters: Record<string, string>;
}

const ProductFilters = ({ onFilterChange, activeFilters }: FilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Filters</h2>

      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2">
          {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                checked={activeFilters.category === category}
                onChange={(e) => onFilterChange('category', e.target.value)}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="font-medium mb-2">Type</h3>
        <div className="space-y-2">
          {['Women', 'Men', 'Kids'].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="type"
                value={type}
                checked={activeFilters.type === type}
                onChange={(e) => onFilterChange('type', e.target.value)}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-2">
          {[
            { label: 'Under ₹10,000', value: '0-10000' },
            { label: '₹10,000 - ₹25,000', value: '10000-25000' },
            { label: '₹25,000 - ₹50,000', value: '25000-50000' },
            { label: 'Above ₹50,000', value: '50000-above' }
          ].map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={activeFilters.priceRange === range.value}
                onChange={(e) => onFilterChange('priceRange', e.target.value)}
                className="mr-2"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          Object.keys(activeFilters).forEach(key => onFilterChange(key, ''));
        }}
        className="w-full py-2 text-red-600 border border-red-600 rounded hover:bg-red-50"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilters;