import React, { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data - in real app, this would come from API
  const mockTrackingData = {
    'PMT654321TEST': {
      trackingId: 'PMT654321TEST',
      status: 'in-transit',
      customerName: 'John Doe',
      serviceType: 'Home Shifting',
      pickupAddress: '123 Main St, Delhi, 110001',
      deliveryAddress: '456 Oak Ave, Mumbai, 400001',
      estimatedDelivery: '2024-01-15',
      updates: [
        {
          status: 'booking-confirmed',
          title: 'Booking Confirmed',
          description: 'Your booking has been confirmed and team assigned',
          timestamp: '2024-01-12 10:30 AM',
          completed: true
        },
        {
          status: 'items-packed',
          title: 'Items Packed',
          description: 'All items have been professionally packed and loaded',
          timestamp: '2024-01-13 09:15 AM',
          completed: true
        },
        {
          status: 'in-transit',
          title: 'In Transit',
          description: 'Your shipment is on the way to destination',
          timestamp: '2024-01-13 02:45 PM',
          completed: true,
          currentLocation: 'Highway toll plaza, Gurgaon'
        },
        {
          status: 'out-for-delivery',
          title: 'Out for Delivery',
          description: 'Your shipment is out for final delivery',
          timestamp: '',
          completed: false
        },
        {
          status: 'delivered',
          title: 'Delivered',
          description: 'Successfully delivered to destination',
          timestamp: '',
          completed: false
        }
      ]
    }
  };

  const handleTrack = () => {
    if (!trackingId.trim()) {
      setError('Please enter a tracking ID');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingId.toUpperCase()];
      if (data) {
        setTrackingData(data);
        setError('');
      } else {
        setTrackingData(null);
        setError('No tracking information found for this ID. Please check and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-8 w-8 text-green-600" />;
    }
    
    switch (status) {
      case 'booking-confirmed':
        return <Package className="h-8 w-8 text-gray-400" />;
      case 'items-packed':
        return <Package className="h-8 w-8 text-gray-400" />;
      case 'in-transit':
        return <Truck className="h-8 w-8 text-blue-600" />;
      case 'out-for-delivery':
        return <Truck className="h-8 w-8 text-gray-400" />;
      case 'delivered':
        return <CheckCircle className="h-8 w-8 text-gray-400" />;
      default:
        return <Clock className="h-8 w-8 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Track Your Shipment
          </h1>
          <p className="text-xl text-gray-600">
            Enter your tracking ID to get real-time updates on your shipment status
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="max-w-md mx-auto">
            <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-2">
              Tracking ID
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  id="trackingId"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tracking ID (e.g., PMT654321TEST)"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Try tracking ID: PMT654321TEST for demo
            </p>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-8">
            {/* Shipment Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipment Details</h2>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-900">Tracking ID:</span>
                      <span className="ml-2 font-mono text-blue-600">{trackingData.trackingId}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Customer:</span>
                      <span className="ml-2 text-gray-600">{trackingData.customerName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Service:</span>
                      <span className="ml-2 text-gray-600">{trackingData.serviceType}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Status:</span>
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trackingData.status)}`}>
                        {trackingData.status.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Est. Delivery:</span>
                      <span className="ml-2 text-gray-600">{trackingData.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Pickup Location</p>
                          <p className="text-sm text-gray-600">{trackingData.pickupAddress}</p>
                        </div>
                      </div>
                    </div>
                    <div className="border-l-2 border-dashed border-gray-300 ml-6 h-8"></div>
                    <div>
                      <div className="flex items-start">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <MapPin className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Delivery Location</p>
                          <p className="text-sm text-gray-600">{trackingData.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Tracking Timeline</h2>
              <div className="space-y-8">
                {trackingData.updates.map((update: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      {getStatusIcon(update.status, update.completed)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        <h3 className={`text-lg font-semibold ${
                          update.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {update.title}
                        </h3>
                        {update.status === trackingData.status && (
                          <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        update.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {update.description}
                      </p>
                      {update.currentLocation && (
                        <p className="text-sm text-blue-600 mb-2">
                          📍 Current Location: {update.currentLocation}
                        </p>
                      )}
                      {update.timestamp && (
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {update.timestamp}
                        </p>
                      )}
                    </div>
                    {index < trackingData.updates.length - 1 && (
                      <div className="absolute left-10 mt-12 w-0.5 h-8 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-6">
                  If you have any questions about your shipment, our customer support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+919876543210"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Clock className="mr-2 h-5 w-5" />
                    Call Support
                  </a>
                  <a
                    href="mailto:support@primemovers.com"
                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Link to tracking page */}
        <div className="mt-8 text-center">
          <Link to={`/track?id=${trackingData?.trackingId}`} className="text-blue-600 hover:underline">
            Track Your Shipment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;
