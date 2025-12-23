import { useState } from 'react';
import { Card } from '@apex-providers/ui-components';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
}

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services: Service[] = [
    {
      id: '1',
      name: 'Spa Massage',
      category: 'Wellness',
      price: 120,
      duration: '60 min',
      description: 'Relaxing full-body massage',
    },
    {
      id: '2',
      name: 'In-Room Dining',
      category: 'Dining',
      price: 0,
      duration: '30-45 min',
      description: 'Order from our restaurant menu',
    },
    {
      id: '3',
      name: 'Airport Transfer',
      category: 'Transport',
      price: 50,
      duration: '45 min',
      description: 'Private car service to/from airport',
    },
    {
      id: '4',
      name: 'Concierge Service',
      category: 'Concierge',
      price: 0,
      duration: 'On-demand',
      description: 'Personalized assistance and recommendations',
    },
  ];

  const categories = ['all', 'Wellness', 'Dining', 'Transport', 'Concierge'];

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-charcoal-gray">Services & Amenities</h1>
        <p className="text-gray-600 mt-2">Book services and amenities for your stay</p>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-gold-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-charcoal-gray">{service.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{service.category}</p>
                </div>
                {service.price > 0 && (
                  <span className="text-lg font-bold text-gold-600">${service.price}</span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Duration: {service.duration}</span>
                <button
                  onClick={() => toggleService(service.id)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedServices.includes(service.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-gold-500 hover:bg-gold-600 text-white'
                  }`}
                >
                  {selectedServices.includes(service.id) ? 'Selected' : 'Book Now'}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Selected Services Summary */}
      {selectedServices.length > 0 && (
        <Card>
          <div className="p-6">
            <h2 className="text-xl font-bold text-charcoal-gray mb-4">Selected Services</h2>
            <div className="space-y-2 mb-4">
              {selectedServices.map((serviceId) => {
                const service = services.find((s) => s.id === serviceId);
                return service ? (
                  <div key={serviceId} className="flex justify-between items-center">
                    <span>{service.name}</span>
                    <span className="font-bold">${service.price.toFixed(2)}</span>
                  </div>
                ) : null;
              })}
            </div>
            <button className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-lg">
              Confirm Booking
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

