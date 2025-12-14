import React from 'react';
import { Target, Users, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          About Us
        </h3>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We are revolutionizing the way fresh chicken reaches your home
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h4>
            <p className="text-gray-600">
              To provide the freshest, highest quality chicken with unmatched convenience and customer service to every household.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Our Team</h4>
            <p className="text-gray-600">
              A dedicated team of food safety experts, logistics professionals, and customer service specialists committed to excellence.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Our Promise</h4>
            <p className="text-gray-600">
              Farm-to-table freshness, strict hygiene standards, and reliable delivery - that's our guarantee to you.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-8 sm:p-12">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h4>
          <p className="text-gray-700 mb-4">
            TOKKRI was born from a simple observation: families deserve access to fresh, high-quality chicken without compromising on hygiene or convenience. We saw the challenges people faced - unpredictable quality at local markets, concerns about freshness, and the hassle of transportation.
          </p>
          <p className="text-gray-700 mb-4">
            We partnered with trusted poultry farms that follow the highest standards of animal welfare and food safety. Our state-of-the-art processing facility ensures that every cut meets stringent quality checks before it reaches your doorstep.
          </p>
          <p className="text-gray-700">
            Today, we're building something more than just a delivery service - we're creating a community of people who value quality, health, and convenience. Join us on this journey to redefine fresh food delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;