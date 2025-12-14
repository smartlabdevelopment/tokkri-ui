import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, Package, CheckCircle, X } from 'lucide-react';
import productsData from '../resources/ProductData.json';

const SubscriptionPlan = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState('weekly');

  // Flatten all products from all categories
  const allProducts = Object.values(productsData).flatMap(category => 
    category.products.map(product => ({
      ...product,
      categoryName: category.name,
      categoryIcon: category.icon
    }))
  );

  const frequencies = [
    { value: 'daily', label: 'Daily', discount: '5%' },
    { value: 'alternate', label: 'Alternate Days', discount: '8%' },
    { value: 'weekly', label: 'Weekly', discount: '10%' },
    { value: 'biweekly', label: 'Bi-Weekly', discount: '12%' },
    { value: 'monthly', label: 'Monthly', discount: '15%' }
  ];

  const deliveryTimes = [
    { value: 'morning', label: 'Morning (6 AM - 9 AM)' },
    { value: 'afternoon', label: 'Afternoon (12 PM - 3 PM)' },
    { value: 'evening', label: 'Evening (5 PM - 8 PM)' }
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const addProduct = () => {
    if (currentProduct) {
      const newProduct = {
        ...currentProduct,
        id: Date.now(),
        selectedQuantity: currentProduct.quantities[0],
        deliveryDays: [],
        deliveryTime: 'morning',
        startDate: new Date().toISOString().split('T')[0]
      };
      setSelectedProducts([...selectedProducts, newProduct]);
      setCurrentProduct(null);
      setShowProductModal(false);
    }
  };

  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setSelectedProducts(selectedProducts.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const toggleDeliveryDay = (id, day) => {
    setSelectedProducts(selectedProducts.map(p => {
      if (p.id === id) {
        const days = p.deliveryDays.includes(day)
          ? p.deliveryDays.filter(d => d !== day)
          : [...p.deliveryDays, day];
        return { ...p, deliveryDays: days };
      }
      return p;
    }));
  };

  const getImageUrl = (imageName) => {
    return new URL(`../assets/product-images/${imageName}`, import.meta.url).href;
  };

  return (
    <section id="subscription" className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Subscription Plans
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Save more with our flexible subscription plans. Choose products, delivery days, and frequency.
          </p>
        </div>

        {/* Frequency Selection */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 mb-8">
          <h4 className="text-xl font-bold text-gray-900 mb-4">Select Delivery Frequency</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {frequencies.map((freq) => (
              <button
                key={freq.value}
                onClick={() => setSubscriptionFrequency(freq.value)}
                className={`p-4 rounded-lg border-2 transition ${
                  subscriptionFrequency === freq.value
                    ? 'border-red-600 bg-white shadow-lg'
                    : 'border-gray-200 bg-white hover:border-red-300'
                }`}
              >
                <div className="font-bold text-gray-900">{freq.label}</div>
                <div className="text-sm text-red-600 font-semibold mt-1">
                  Save {freq.discount}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Products */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-900">Your Subscription Items</h4>
            <button
              onClick={() => setShowProductModal(true)}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
          </div>

          {selectedProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No products added yet. Click "Add Product" to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedProducts.map((product) => (
                <div key={product.id} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image & Info */}
                    <div className="flex gap-4 flex-shrink-0">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 mb-1">{product.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{product.categoryIcon} {product.categoryName}</p>
                        
                        {/* Quantity Selection */}
                        <select
                          value={product.selectedQuantity}
                          onChange={(e) => updateProduct(product.id, 'selectedQuantity', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                        >
                          {product.quantities.map((qty) => (
                            <option key={qty} value={qty}>{qty}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Delivery Schedule */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Delivery Days
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {weekDays.map((day) => (
                            <button
                              key={day}
                              onClick={() => toggleDeliveryDay(product.id, day)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                                product.deliveryDays.includes(day)
                                  ? 'bg-red-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Start Date */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={product.startDate}
                            onChange={(e) => updateProduct(product.id, 'startDate', e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>

                        {/* Delivery Time */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Delivery Time
                          </label>
                          <select
                            value={product.deliveryTime}
                            onChange={(e) => updateProduct(product.id, 'deliveryTime', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          >
                            {deliveryTimes.map((time) => (
                              <option key={time.value} value={time.value}>{time.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="text-red-600 hover:text-red-700 p-2 h-fit"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subscribe Button */}
        {selectedProducts.length > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h5 className="text-xl font-bold mb-1">Ready to Subscribe?</h5>
                <p className="text-sm opacity-90">
                  {selectedProducts.length} product(s) • {subscriptionFrequency} delivery • Save up to {frequencies.find(f => f.value === subscriptionFrequency)?.discount}
                </p>
              </div>
              <button className="flex items-center px-8 py-3 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition">
                <CheckCircle className="w-5 h-5 mr-2" />
                Subscribe Now
              </button>
            </div>
          </div>
        )}

        {/* Product Selection Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h4 className="text-xl font-bold text-gray-900">Select Product</h4>
                <button
                  onClick={() => {
                    setShowProductModal(false);
                    setCurrentProduct(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {allProducts.map((product) => (
                    <div
                      key={product.sku}
                      onClick={() => setCurrentProduct(product)}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition ${
                        currentProduct?.sku === product.sku
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          src={getImageUrl(product.image)}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="flex-1">
                          <h5 className="font-bold text-gray-900 text-sm mb-1">{product.name}</h5>
                          <p className="text-xs text-gray-600 mb-2">{product.categoryIcon} {product.categoryName}</p>
                          <div className="text-xs text-gray-500">
                            {product.quantities.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowProductModal(false);
                    setCurrentProduct(null);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addProduct}
                  disabled={!currentProduct}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    currentProduct
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add to Subscription
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriptionPlan;