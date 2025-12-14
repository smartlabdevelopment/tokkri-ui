import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-4">TOKKRI</h4>
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
                  <p>+91 9044521514</p>
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
                  <p>hello@tokkri.in</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Address</h4>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-400">
                Kanpur, Uttar Pradesh<br />
                India - 208025
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 TOKKRI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;