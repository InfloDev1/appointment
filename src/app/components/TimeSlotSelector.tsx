'use client';

import { useState } from 'react';
import { format, addMinutes, setHours, setMinutes } from 'date-fns';
import { motion } from 'framer-motion';

interface TimeSlotSelectorProps {
  selectedDate: Date;
  onTimeSelect: (time: Date) => void;
}

export default function TimeSlotSelector({ selectedDate, onTimeSelect }: TimeSlotSelectorProps) {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  
  // Generate time slots from 9 AM to 5 PM with 30-minute intervals
  const generateTimeSlots = () => {
    const slots: Date[] = [];
    let currentTime = setMinutes(setHours(selectedDate, 9), 0); // Start at 9 AM
    
    while (currentTime < setMinutes(setHours(selectedDate, 17), 0)) { // End at 5 PM
      slots.push(new Date(currentTime));
      currentTime = addMinutes(currentTime, 30);
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Select a Time</h2>
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((time) => (
          <motion.button
            key={time.toISOString()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTimeSelect(time)}
            className={`p-3 rounded-lg text-center ${
              selectedTime?.toISOString() === time.toISOString()
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-sm font-medium">
              {format(time, 'h:mm a')}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
} 