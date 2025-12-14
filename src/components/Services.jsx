import React from 'react';

const Services = ({ onSubscriptionClick }) => {
  const services = [
    {
      title: "On Demand",
      description: "Order fresh chicken whenever you need it",
      icon: "🛒",
      action: null
    },
    {
      title: "Subscription",
      description: "Regular deliveries at discounted rates",
      icon: "📦",
      action: onSubscriptionClick
    },
    {
      title: "Bulk Orders",
      description: "Special pricing for large quantities",
      icon: "🏪",
      action: null
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Our Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={service.action}
              className={`bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100 ${
                service.action ? 'cursor-pointer' : ''
              }`}
            >
              <div className="text-4xl sm:text-5xl mb-4">{service.icon}</div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {service.description}
              </p>
              {service.action && (
                <div className="text-red-600 font-semibold text-sm flex items-center">
                  Explore Plans →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;