import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState(null);
  
  const moods = [
    { label: 'Very Happy', emoji: '🤩', color: 'bg-green-50 border-green-400 text-green-700' },
    { label: 'Happy', emoji: '🙂', color: 'bg-blue-50 border-blue-400 text-blue-700' },
    { label: 'Neutral', emoji: '😐', color: 'bg-gray-50 border-gray-400 text-gray-700' },
    { label: 'Stressed', emoji: '😓', color: 'bg-orange-50 border-orange-400 text-orange-700' },
    { label: 'Very Stressed', emoji: '😫', color: 'bg-red-50 border-red-400 text-red-700' },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How are you feeling?</h2>
      
      <div className="flex justify-between gap-2 mb-6">
        {moods.map((mood) => (
          <motion.button
            key={mood.label}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(mood)}
            className={`flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-200 ${
              selectedMood?.label === mood.label 
                ? mood.color 
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
            aria-label={mood.label}
          >
            <span className="text-2xl sm:text-3xl">{mood.emoji}</span>
          </motion.button>
        ))}
      </div>

      {selectedMood && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-center"
        >
          <div className={`p-3 rounded-lg inline-block ${selectedMood.color}`}>
            <p className="font-medium">
              You're feeling <strong>{selectedMood.label}</strong>
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-2">Thanks for sharing. Your mood has been recorded.</p>
        </motion.div>
      )}
    </div>
  );
}