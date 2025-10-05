import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import BookingStep1 from '../components/booking/BookingStep1';
import BookingStep2 from '../components/booking/BookingStep2';
import BookingStep3 from '../components/booking/BookingStep3';
import BookingStep4 from '../components/booking/BookingStep4';

function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { bookingData, generateTrackingId } = useBooking();

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic details' },
    { number: 2, title: 'Addresses', description: 'Pickup & delivery' },
    { number: 3, title: 'Service Details', description: 'Date, time & items' },
    { number: 4, title: 'Photos & Review', description: 'Upload photos & confirm' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Generate tracking ID and finalize booking
    const trackingId = generateTrackingId();
    // ...other booking logic...
    navigate('/confirmation');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BookingStep1 onNext={handleNext} scripts={{
          dev: 'vite',
          build: 'vite build',
          lint: 'eslint .',
          preview: 'vite preview'
        }} />;
      case 2:
        return <BookingStep2 onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <BookingStep3 onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <BookingStep4 onSubmit={handleSubmit} onPrevious={handlePrevious} />;
      default:
        return <BookingStep1 onNext={handleNext} scripts={{
          dev: 'vite',
          build: 'vite build',
          lint: 'eslint .',
          preview: 'vite preview'
        }} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Book Your Moving Service
          </h1>
          <p className="text-xl text-gray-600">
            Complete the form below to get your personalized moving quote
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    currentStep >= step.number 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;