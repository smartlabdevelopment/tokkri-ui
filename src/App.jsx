import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Truck, Shield, Slice, IndianRupee, Menu, X, Target, Users, Award ,Bell} from 'lucide-react';
import TokkriLogo from "./assets/tokkri_3d_logo.PNG";
import TokkriTransparentLogo from "./assets/tokkri_icon_transparent.ico";
import ProductCatalog from './components/ProductCatalog';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import SubscriptionPlan from './components/SubscriptionPlan';
import Services from './components/Services';
import NotifyMe from './components/NotifyMe';

// In your App component, add before footer:

const App = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
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
      icon: <Slice className="w-12 h-12" />,
      title: "Custom Cuts",
      description: "Get your chicken cut exactly the way you want it"
    },
    {
      icon: <IndianRupee className="w-12 h-12" />,
      title: "Best Prices",
      description: "Premium quality at the most competitive prices in town"
    }
  ];

  const handleSubscriptionClick = () => {
    scrollToSection('subscription');
  };

  useEffect(() => {
    const targetDate = new Date('2026-01-15T00:00:00').getTime();
    
    const updateTimer = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
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
  const openNotifyModal = () => {
    setIsNotifyModalOpen(true);
    setMobileMenuOpen(false);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeNotifyModal = () => {
    setIsNotifyModalOpen(false);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white rounded-lg">
                <img 
                  src={TokkriLogo} 
                  alt="Tokkri Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl text-red-600 font-bold">TOKKRI</h1>
                <p className="text-xs sm:text-sm text-gray-600">Premium Quality Delivered</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-sm font-medium transition ${
                  activeSection === 'home' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-sm font-medium transition ${
                  activeSection === 'about' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className={`text-sm font-medium transition ${
                  activeSection === 'products' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('subscription')}
                className={`text-sm font-medium transition ${
                  activeSection === 'subscription' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Subscription
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`text-sm font-medium transition ${
                  activeSection === 'services' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`text-sm font-medium transition ${
                  activeSection === 'contact' 
                    ? 'text-red-600 border-b-2 border-red-600' 
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Contact
              </button>
              <button 
                              onClick={openNotifyModal}
                              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition flex items-center space-x-2 shadow-md"
                            >
                              <Bell size={18} />
                              <span>Notify Me</span>
                            </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-red-600 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <button
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === 'home' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === 'about' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === 'products' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('subscription')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === 'subscription' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Subscription
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === 'services' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                  activeSection === 'contact' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Contact
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow">
        {/* Home Section - Coming Soon */}
        <section id="home" className="pt-2 pb-12 sm:pt-3 sm:pb-16 lg:pt-4 lg:pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center items-center">
              <img
                src={TokkriTransparentLogo} 
                alt="TOKKRI Logo"
                className="h-auto object-contain"
              />
            </div>
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

        {/* About Us Section */}
        <AboutUs />

        {/* Products Catalog - Imported Component */}
        <ProductCatalog />

        {/* Subscription Plan - Imported Component */}
        <SubscriptionPlan />
        

        {/* Features Carousel */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              Why Choose Us
            </h3>
            
            <div className="relative">
              <div className="overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-red-500 to-red-500 p-8 sm:p-12">
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
        <Services onSubscriptionClick={handleSubscriptionClick} />
      </main>
       {/* Floating Action Button */}
      <button
        onClick={openNotifyModal}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 hover:scale-110 transition-all duration-300 z-40 animate-bounce"
        aria-label="Get Notified"
      >
        <Bell size={28} />
      </button>
 {/* Notify Me Modal - Only render when open */}
      {isNotifyModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
          onClick={closeNotifyModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeNotifyModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 z-10 transition"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="max-h-[85vh] overflow-y-auto">
              <NotifyMe onClose={closeNotifyModal} />
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <Contact />
    </div>
  );
};

export default App;