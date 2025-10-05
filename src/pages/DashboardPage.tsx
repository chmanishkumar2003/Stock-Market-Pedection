import React, { useState } from 'react';
import { Calendar, MapPin, Package, Phone, Star, Clock, CheckCircle, Truck } from 'lucide-react';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('current');

  // Mock user data - in real app, this would come from authentication/API
  const mockBookings = [
    {
      id: 1,
      trackingId: 'PMT123456ABC',
      serviceType: 'Home Shifting',
      status: 'confirmed',
      pickupAddress: '123 Main St, Delhi, 110001',
      deliveryAddress: '456 Oak Ave, Mumbai, 400001',
      scheduledDate: '2024-01-15',
      estimatedCost: 15000,
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      trackingId: 'PMT654321DEF',
      serviceType: 'Office Relocation',
      status: 'in-transit',
      pickupAddress: '789 Business Park, Gurgaon, 122001',
      deliveryAddress: '321 Corporate Ave, Bangalore, 560001',
      scheduledDate: '2024-01-12',
      estimatedCost: 25000,
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      trackingId: 'PMT987654GHI',
      serviceType: 'Vehicle Transport',
      status: 'delivered',
      pickupAddress: '555 Residency Road, Pune, 411001',
      deliveryAddress: '777 Lake View, Chennai, 600001',
      scheduledDate: '2024-01-05',
      estimatedCost: 8000,
      createdAt: '2024-01-03',
      deliveredAt: '2024-01-06'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'in-transit':
        return <Truck className="h-5 w-5 text-yellow-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const currentBookings = mockBookings.filter(b => b.status !== 'delivered');
  const completedBookings = mockBookings.filter(b => b.status === 'delivered');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            My Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage and track all your moving services in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{mockBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Shipments</p>
                <p className="text-2xl font-bold text-gray-900">{currentBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedBookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('current')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'current'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Current Bookings ({currentBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-6 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Completed ({completedBookings.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'current' && (
              <div className="space-y-6">
                {currentBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No current bookings</h3>
                    <p className="text-gray-600 mb-6">You don't have any active shipments at the moment.</p>
                    <a
                      href="/book"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Book New Service
                    </a>
                  </div>
                ) : (
                  currentBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-6">
                {completedBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No completed bookings</h3>
                    <p className="text-gray-600">Your completed shipments will appear here.</p>
                  </div>
                ) : (
                  completedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Customer Support</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">+91 98765 43210</p>
                    <p className="text-sm text-gray-600">24/7 Support Available</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">support@primemovers.com</p>
                    <p className="text-sm text-gray-600">Response within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/book"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book New Service
                </a>
                <a
                  href="/track"
                  className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Track Shipment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingCard({ booking }: { booking: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'in-transit':
        return <Truck className="h-5 w-5 text-yellow-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="mr-4">
            {getStatusIcon(booking.status)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {booking.serviceType}
            </h3>
            <p className="text-sm text-gray-600">
              Tracking ID: <span className="font-mono">{booking.trackingId}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </span>
          <span className="text-lg font-bold text-gray-900">
            ₹{booking.estimatedCost.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <MapPin className="h-4 w-4 text-green-600 mr-2" />
            Pickup Address
          </h4>
          <p className="text-sm text-gray-600">{booking.pickupAddress}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
            <MapPin className="h-4 w-4 text-red-600 mr-2" />
            Delivery Address
          </h4>
          <p className="text-sm text-gray-600">{booking.deliveryAddress}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center text-sm text-gray-600 mb-4 sm:mb-0">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Scheduled: {booking.scheduledDate}</span>
          {booking.deliveredAt && (
            <span className="ml-4">
              Delivered: {booking.deliveredAt}
            </span>
          )}
        </div>
        
        <div className="flex space-x-3">
          <a
            href={`/track?id=${booking.trackingId}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Track
          </a>
          {booking.status === 'delivered' && (
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Star className="h-4 w-4 mr-1" />
              Rate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;