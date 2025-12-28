import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Clock, Truck, Shield, Slice, IndianRupee, Menu, X, Target, Users, Award, Bell } from 'lucide-react';
import TokkriLogo from "./assets/tokkri_3d_logo.PNG";
import TokkriTransparentLogo from "./assets/tokkri_icon_transparent.ico";
import ProductCatalog from './components/ProductCatalog';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import SubscriptionPlan from './components/SubscriptionPlan';
import Services from './components/Services';
import NotifyMe from './components/NotifyMe';

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
      icon: <Truck className="text-orange-600" size={48} />,
      title: "Fast Delivery",
      description: "Get fresh chicken delivered to your doorstep within hours"
    },
    {
      icon: <Shield className="text-orange-600" size={48} />,
      title: "Quality Assured",
      description: "100% fresh, antibiotic-free chicken from trusted farms"
    },
    {
      icon: <Slice className="text-orange-600" size={48} />,
      title: "Custom Cuts",
      description: "Choose your preferred cuts and portions"
    },
    {
      icon: <IndianRupee className="text-orange-600" size={48} />,
      title: "Best Prices",
      description: "Premium quality at competitive prices"
    }
  ];

  useEffect(() => {
    const launchDate = new Date('2025-01-15T00:00:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [features.length]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img src={TokkriTransparentLogo} alt="Tokkri Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold text-orange-600">Tokkri</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#home" onClick={() => setActiveSection('home')} className={`hover:text-orange-600 transition ${activeSection === 'home' ? 'text-orange-600 font-semibold' : ''}`}>Home</a>
              <a href="#products" onClick={() => setActiveSection('products')} className={`hover:text-orange-600 transition ${activeSection === 'products' ? 'text-orange-600 font-semibold' : ''}`}>Products</a>
              <a href="#services" onClick={() => setActiveSection('services')} className={`hover:text-orange-600 transition ${activeSection === 'services' ? 'text-orange-600 font-semibold' : ''}`}>Services</a>
              <a href="#subscription" onClick={() => setActiveSection('subscription')} className={`hover:text-orange-600 transition ${activeSection === 'subscription' ? 'text-orange-600 font-semibold' : ''}`}>Subscription</a>
              <a href="#about" onClick={() => setActiveSection('about')} className={`hover:text-orange-600 transition ${activeSection === 'about' ? 'text-orange-600 font-semibold' : ''}`}>About</a>
              <a href="#contact" onClick={() => setActiveSection('contact')} className={`hover:text-orange-600 transition ${activeSection === 'contact' ? 'text-orange-600 font-semibold' : ''}`}>Contact</a>
              
              <button 
                onClick={openNotifyModal}
                className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition flex items-center space-x-2 shadow-md"
              >
                <Bell size={18} />
                <span>Notify Me</span>
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <a href="#home" onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }} className="py-2 hover:text-orange-600">Home</a>
                <a href="#products" onClick={() => { setActiveSection('products'); setMobileMenuOpen(false); }} className="py-2 hover:text-orange-600">Products</a>
                <a href="#services" onClick={() => { setActiveSection('services'); setMobileMenuOpen(false); }} className="py-2 hover:text-orange-600">Services</a>
                <a href="#subscription" onClick={() => { setActiveSection('subscription'); setMobileMenuOpen(false); }} className="py-2 hover:text-orange-600">Subscription</a>
                <a href="#about" onClick={() => { setActiveSection('about'); setMobileMenuOpen(false); }} className="py-2 hover:text-orange-600">About</a>
                <a href="#contact" onClick={() => { setActiveSection('contact'); setMobileMenuOpen(false); }} className="py-2 hover:text-orange-600">Contact</a>
                
                <button 
                  onClick={openNotifyModal}
                  className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition flex items-center justify-center space-x-2 shadow-md"
                >
                  <Bell size={18} />
                  <span>Notify Me</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="container mx-auto px-4 py-20 text-center">
        <img src={TokkriLogo} alt="Tokkri 3D Logo" className="mx-auto h-48 mb-8" />
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Coming Soon
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Fresh chicken delivered to your doorstep. Get ready for the best quality!
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center space-x-4 mb-16">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-orange-600">{value}</div>
              <div className="text-sm text-gray-600 uppercase">{unit}</div>
            </div>
          ))}
        </div>

        {/* Features Carousel */}
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Us</h2>
          
          <div className="relative">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition hidden md:block"
              aria-label="Previous feature"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                {features[currentSlide].icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {features[currentSlide].title}
              </h3>
              <p className="text-gray-600">
                {features[currentSlide].description}
              </p>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition hidden md:block"
              aria-label="Next feature"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition ${
                  currentSlide === index ? 'bg-orange-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products">
        <ProductCatalog />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Subscription Section */}
      <section id="subscription">
        <SubscriptionPlan />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutUs />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>

      {/* Floating Action Button */}
      <button
        onClick={openNotifyModal}
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 hover:scale-110 transition-all duration-300 z-40 animate-bounce"
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
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <img src={TokkriTransparentLogo} alt="Tokkri Logo" className="h-6 w-6 mr-2" />
                Tokkri
              </h3>
              <p className="text-gray-400">Fresh chicken delivery at your doorstep</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>info@tokkri.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <div className="flex items-start space-x-2 text-gray-400">
                <Clock size={16} className="mt-1" />
                <div>
                  <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Tokkri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
