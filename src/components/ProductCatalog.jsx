import React, { useState } from 'react';
import { Package, ShoppingCart } from 'lucide-react';
import productsData from '../resources/productData.json';

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dynamic image import using Vite - adjusted for components folder
  const getImageUrl = (imageName) => {
    return new URL(`../assets/product-images/${imageName}`, import.meta.url).href;
  };

  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Premium Products
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of fresh, high-quality chicken products.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-red-50'
            }`}
          >
            All Products
          </button>
          {Object.keys(productsData).map((catKey) => (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === catKey
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-red-50'
              }`}
            >
              {productsData[catKey].icon} {productsData[catKey].name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {Object.entries(productsData).map(([catKey, category]) => {
          if (selectedCategory !== 'all' && selectedCategory !== catKey) return null;
          
          return (
            <div key={catKey} className="mb-16">
              {selectedCategory === 'all' && (
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  {category.name}
                </h4>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => {
                  return (
                    <div
                      key={product.sku}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                      {/* Product Image */}
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-red-100 to-orange-100">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center">
                                <svg class="w-20 h-20 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                              </div>
                            `;
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="text-lg font-bold text-gray-900 flex-1">
                            {product.name}
                          </h5>
                          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                            {product.sku}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">
                          {product.description}
                        </p>

                        <div className="bg-orange-50 rounded-lg p-3 mb-4">
                          <p className="text-xs font-medium text-orange-800">
                            ✨ Best For: {product.bestFor}
                          </p>
                        </div>

                        {/* Available Quantities */}
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Available Quantities:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {product.quantities.map((qty) => (
                              <span
                                key={qty}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {qty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Coming Soon Badge */}
                        <div className="flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          <span className="font-medium text-sm">Coming Soon</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCatalog;