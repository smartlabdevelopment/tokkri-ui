import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Truck, Shield, Scissors, DollarSign } from 'lucide-react';

const App = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Freshly Cut Raw Chicken",
      description: "Farm-fresh chicken, cut daily to ensure maximum freshness and quality"
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: "Quick Delivery",
      description: "Fast and reliable delivery right to your doorstep within hours"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Hygiene",
      description: "Maintaining highest standards of cleanliness and food safety"
    },
    {
      icon: <Scissors className="w-12 h-12" />,
      title: "Custom Cuts",
      description: "Get your chicken cut exactly the way you want it"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Best Prices",
      description: "Premium quality at the most competitive prices in town"
    }
  ];

  const services = [
    {
      title: "On Demand",
      description: "Order fresh chicken whenever you need it",
      icon: "🛒"
    },
    {
      title: "Subscription",
      description: "Regular deliveries at discounted rates",
      icon: "📦"
    },
    {
      title: "Bulk Orders",
      description: "Special pricing for large quantities",
      icon: "🏪"
    }
  ];

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white p-2 rounded-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">FreshChicken</h1>
                <p className="text-xs sm:text-sm text-gray-600">Premium Quality Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow">
        {/* Coming Soon Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12">
              Fresh chicken delivered to your doorstep. Get ready for the best quality!
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto mb-12 sm:mb-16">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 capitalize mt-1 sm:mt-2">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Carousel */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              Why Choose Us
            </h3>
            
            <div className="relative">
              <div className="overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-red-500 to-orange-500 p-8 sm:p-12">
                <div className="text-white text-center">
                  <div className="flex justify-center mb-6">
                    {features[currentSlide].icon}
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold mb-4">
                    {features[currentSlide].title}
                  </h4>
                  <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
                    {features[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
                      currentSlide === index ? 'bg-red-600 w-6 sm:w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="py-12 sm:py-16 lg:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              Our Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition transform hover:-translate-y-2"
                >
                  <div className="text-4xl sm:text-5xl mb-4">{service.icon}</div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">FreshChicken</h4>
              <p className="text-gray-400 text-sm">
                Premium quality chicken delivered fresh to your doorstep
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>+91 98765 43210</p>
                    <p>+91 87654 32109</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Email</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>info@freshchicken.com</p>
                    <p>support@freshchicken.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Address</h4>
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400">
                  123 Market Street<br />
                  Lucknow, Uttar Pradesh<br />
                  India - 226001
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 FreshChicken. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;