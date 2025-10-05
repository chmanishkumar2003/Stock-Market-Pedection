import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Shield, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle, 
  Phone, 
  ArrowRight,
  Package,
  Home,
  Building,
  Car
} from 'lucide-react';

function HomePage() {
  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Home Shifting",
      description: "Complete household relocation with professional packing and safe transport.",
      image: "https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Office Relocation",
      description: "Seamless office moves with minimal downtime and organized setup.",
      image: "https://images.pexels.com/photos/7464722/pexels-photo-7464722.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: "Vehicle Transport",
      description: "Safe car and bike transportation with door-to-door delivery.",
      image: "https://images.pexels.com/photos/3846455/pexels-photo-3846455.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Storage Solutions",
      description: "Secure warehousing and storage facilities for your belongings.",
      image: "https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Safe & Secure",
      description: "Full insurance coverage and careful handling"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "On-Time Delivery",
      description: "Guaranteed delivery within promised timeframe"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Real-Time Tracking",
      description: "Track your shipment status anytime, anywhere"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Round-the-clock customer service assistance"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Delhi to Bangalore",
      rating: 5,
      comment: "Excellent service! They handled my furniture with great care. Highly recommended!",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Priya Sharma",
      location: "Mumbai to Pune",
      rating: 5,
      comment: "Professional team, on-time delivery, and reasonable pricing. Very satisfied!",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Amit Patel",
      location: "Hyderabad to Chennai",
      rating: 5,
      comment: "Stress-free relocation experience. The team was courteous and efficient.",
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Safe & Reliable
                <span className="block text-blue-200">Moving Services</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Professional packers and movers providing stress-free relocation 
                services across India with complete safety and on-time delivery guarantee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/book" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  Book Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="tel:+919876543210" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7464006/pexels-photo-7464006.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Professional movers"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PrimeMovers?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end relocation solutions with a focus on customer satisfaction and safety
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive moving and relocation services tailored to your specific needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-blue-600 mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures a hassle-free moving experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Get Quote", description: "Fill booking form and get instant estimate" },
              { step: "2", title: "Schedule", description: "Choose convenient date and time slot" },
              { step: "3", title: "Pack & Move", description: "Professional packing and safe transportation" },
              { step: "4", title: "Delivered", description: "Safe delivery at your destination" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="border-t-2 border-dashed border-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real feedback from our satisfied customers across India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Move? Get Started Today!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trusted us with their relocation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/book" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors group"
            >
              Book Your Move Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/track" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Track Existing Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;