import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { CheckCircle, Copy, Download, Share2, Calendar, MapPin, Phone, Mail } from 'lucide-react';

function ConfirmationPage() {
  const { bookingData } = useBooking();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Redirect to home if no booking data
    if (!bookingData.trackingId) {
      window.location.href = '/';
    }
  }, [bookingData.trackingId]);

  const copyTrackingId = () => {
    if (bookingData.trackingId) {
      navigator.clipboard.writeText(bookingData.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadBookingDetails = () => {
    const bookingDetails = `
BOOKING CONFIRMATION - PRIMEMOVERS

Tracking ID: ${bookingData.trackingId}
Status: ${bookingData.status}

CUSTOMER DETAILS:
Name: ${bookingData.personalInfo.name}
Email: ${bookingData.personalInfo.email}
Phone: ${bookingData.personalInfo.phone}

SERVICE DETAILS:
Type: ${bookingData.serviceDetails.serviceType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
Date: ${bookingData.serviceDetails.scheduledDate}
Time: ${bookingData.serviceDetails.timeSlot}
Room Size: ${bookingData.serviceDetails.roomSize}
Estimated Weight: ${bookingData.serviceDetails.estimatedWeight}

ADDRESSES:
Pickup: ${bookingData.addresses.pickup.address}, ${bookingData.addresses.pickup.city}, ${bookingData.addresses.pickup.pincode}
Delivery: ${bookingData.addresses.delivery.address}, ${bookingData.addresses.delivery.city}, ${bookingData.addresses.delivery.pincode}

COST:
Estimated Cost: ₹${bookingData.estimatedCost?.toLocaleString()}

For support, contact: +91 98765 43210 or support@primemovers.com
    `;

    const blob = new Blob([bookingDetails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PrimeMovers_Booking_${bookingData.trackingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!bookingData.trackingId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your moving service has been successfully booked. We'll be in touch soon to confirm the details.
          </p>
        </div>

        {/* Tracking ID Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Tracking ID</h2>
            <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {bookingData.trackingId}
              </div>
              <p className="text-gray-600 mb-4">
                Keep this ID safe for tracking your shipment and future reference
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={copyTrackingId}
                  className="inline-flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy ID'}
                </button>
                <button
                  onClick={downloadBookingDetails}
                  className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Service Details
                </h4>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Service:</span>{' '}
                    {bookingData.serviceDetails.serviceType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {bookingData.serviceDetails.scheduledDate}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {bookingData.serviceDetails.timeSlot}
                  </p>
                  <p>
                    <span className="font-medium">Room Size:</span> {bookingData.serviceDetails.roomSize}
                  </p>
                  <p>
                    <span className="font-medium">Estimated Weight:</span> {bookingData.serviceDetails.estimatedWeight}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                  Addresses
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-900">Pickup Address:</p>
                    <p className="text-gray-600 text-sm">
                      {bookingData.addresses.pickup.address}, {bookingData.addresses.pickup.city}, {bookingData.addresses.pickup.pincode}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Delivery Address:</p>
                    <p className="text-gray-600 text-sm">
                      {bookingData.addresses.delivery.address}, {bookingData.addresses.delivery.city}, {bookingData.addresses.delivery.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Customer Information</h4>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Name:</span> {bookingData.personalInfo.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {bookingData.personalInfo.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {bookingData.personalInfo.phone}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cost Information</h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Estimated Cost:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{bookingData.estimatedCost?.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    * Final amount may vary based on actual weight and additional services
                  </p>
                </div>
              </div>

              {bookingData.photos && bookingData.photos.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Uploaded Photos</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {bookingData.photos.length} photo(s) uploaded for reference
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {bookingData.photos.slice(0, 6).map((photo, index) => (
                      <img
                        key={photo.id}
                        src={photo.preview}
                        alt={`Item ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                  {bookingData.photos.length > 6 && (
                    <p className="text-sm text-gray-500 mt-2">
                      +{bookingData.photos.length - 6} more photos
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Confirmation Call</h4>
              <p className="text-gray-600 text-sm">
                Our team will call you within 2 hours to confirm details and schedule survey if needed.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Schedule Confirmation</h4>
              <p className="text-gray-600 text-sm">
                We'll confirm your preferred date and time, and assign our professional team.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Service Day</h4>
              <p className="text-gray-600 text-sm">
                Our team arrives on time with proper equipment to handle your move safely.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-900 text-white rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Customer Support</h4>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  +91 98765 43210
                </p>
                <p className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  support@primemovers.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Office Hours</h4>
              <p className="text-gray-300">
                Monday - Sunday: 24/7<br />
                Emergency support available
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/track"
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Track Your Shipment
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Dashboard
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;