'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard, User, ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import DateSelector from '../components/DateSelector';
import TimeSlotSelector from '../components/TimeSlotSelector';
import PaymentForm from '../components/PaymentForm';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Haircut & Style',
    duration: 30,
    price: 45,
    description: 'Professional haircut and styling service'
  },
  {
    id: '2',
    name: 'Hair Color',
    duration: 120,
    price: 120,
    description: 'Full hair coloring service with premium products'
  },
  {
    id: '3',
    name: 'Hair Treatment',
    duration: 60,
    price: 85,
    description: 'Deep conditioning and treatment service'
  }
];

type BookingStep = 'service' | 'date' | 'time' | 'payment';

export default function BookingPage() {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [currentStep, setCurrentStep] = useState<BookingStep>('service');
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const handleServiceSelect = (service: Service) => {
    setSelectedServices(prev => [...prev, service]);
  };

  const handleServiceRemove = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      setCurrentStep('date');
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep('time');
  };

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    setIsBookingComplete(true);
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'date':
        setCurrentStep('service');
        setSelectedServices([]);
        break;
      case 'time':
        setCurrentStep('date');
        setSelectedDate(null);
        break;
      case 'payment':
        setCurrentStep('time');
        setSelectedTime(null);
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'service':
        if (selectedServices.length > 0) {
          setCurrentStep('date');
        }
        break;
      case 'date':
        if (selectedDate) {
          setCurrentStep('time');
        }
        break;
      case 'time':
        if (selectedTime) {
          setCurrentStep('payment');
        }
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    switch (currentStep) {
      case 'date':
        setCurrentStep('service');
        break;
      case 'time':
        setCurrentStep('date');
        break;
      case 'payment':
        setCurrentStep('time');
        break;
      default:
        break;
    }
  };

  const calculateTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration, 0);
  };

  const calculateTotalPrice = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const renderStep = () => {
    if (isBookingComplete) {
      return (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
          <p className="text-gray-600">
            Your appointment has been successfully booked. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => {
              setSelectedServices([]);
              setSelectedDate(null);
              setSelectedTime(null);
              setCurrentStep('service');
              setIsBookingComplete(false);
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      );
    }

    switch (currentStep) {
      case 'service':
        return (
          <div className="grid grid-cols-2 gap-6">
            {/* Available Services */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Services</h3>
              <div className="space-y-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedServices.some(s => s.id === service.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-gray-600 mt-1">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">${service.price}</p>
                        <p className="text-sm text-gray-500">{service.duration} min</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Services */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Services</h3>
              {selectedServices.length > 0 ? (
                <div className="space-y-3">
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-500">{service.duration} min</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-900">${service.price}</span>
                        <button
                          onClick={() => handleServiceRemove(service.id)}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Duration</span>
                      <span className="font-medium text-gray-900">{calculateTotalDuration()} min</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600">Total Price</span>
                      <span className="text-lg font-semibold text-gray-900">${calculateTotalPrice()}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleContinue}
                      className="w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Continue to Date Selection</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No services selected yet</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'date':
        return <DateSelector onDateSelect={handleDateSelect} />;
      case 'time':
        return selectedDate ? <TimeSlotSelector selectedDate={selectedDate} onTimeSelect={handleTimeSelect} /> : null;
      case 'payment':
        return selectedServices.length > 0 && selectedDate && selectedTime ? (
          <PaymentForm 
            amount={calculateTotalPrice()} 
            onPaymentComplete={handlePaymentComplete}
            serviceName={selectedServices.map(s => s.name).join(', ')}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center">
              {currentStep !== 'service' && !isBookingComplete && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </motion.button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Book an Appointment</h1>
                <p className="text-gray-600 mt-1">
                  {currentStep === 'service' && 'Select one or more services to continue'}
                  {currentStep === 'date' && 'Choose a date for your appointment'}
                  {currentStep === 'time' && 'Select an available time slot'}
                  {currentStep === 'payment' && 'Review and complete your booking'}
                  {isBookingComplete && 'Booking Confirmation'}
                </p>
              </div>
            </div>
          </div>

          {/* Booking Steps */}
          {!isBookingComplete && (
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex justify-between items-center">
                <div className={`flex items-center space-x-2 ${currentStep === 'service' ? 'text-blue-500' : 'text-gray-400'}`}>
                  <User className="w-5 h-5" />
                  <span className="text-sm">Select Service</span>
                </div>
                <div className={`flex items-center space-x-2 ${currentStep === 'date' ? 'text-blue-500' : 'text-gray-400'}`}>
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Choose Date</span>
                </div>
                <div className={`flex items-center space-x-2 ${currentStep === 'time' ? 'text-blue-500' : 'text-gray-400'}`}>
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Pick Time</span>
                </div>
                <div className={`flex items-center space-x-2 ${currentStep === 'payment' ? 'text-blue-500' : 'text-gray-400'}`}>
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm">Payment</span>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="p-6">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
} 