import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReportForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    when: '',
    isSafe: null,
    description: ''
  });

  const totalSteps = 4;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const canProceed = () => {
    if (step === 1) return !!formData.category;
    if (step === 3) return formData.isSafe !== null;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // In production, you would replace this with your actual backend URL.
      const response = await fetch('http://localhost:5000/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          incidentType: formData.category,
          date: formData.when,
          safeNow: formData.isSafe,
          description: formData.description
        }),
      });

      if (response.ok) {
        alert('Thank you for sharing. Your report has been submitted securely.');
        setStep(1);
        setFormData({ category: '', when: '', isSafe: null, description: '' });
      } else {
        alert('Failed to submit report. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Support Request</h2>
        <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-1.5">
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5"
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 min-h-[350px] flex flex-col relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1"
            >
              <label className="block text-gray-700 font-medium mb-3">What happened?</label>
              <select 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none bg-white transition-all"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select a category...</option>
                <option value="academic">Academic Stress</option>
                <option value="bullying">Bullying / Harassment</option>
                <option value="personal">Personal Issue</option>
                <option value="health">Health Concern</option>
                <option value="other">Other</option>
              </select>
              <p className="text-gray-400 text-sm mt-3">This helps us connect you with the right support.</p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1"
            >
              <label className="block text-gray-700 font-medium mb-3">When did it happen?</label>
              <input 
                type="datetime-local"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all"
                value={formData.when}
                onChange={(e) => setFormData({...formData, when: e.target.value})}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1"
            >
              <label className="block text-gray-700 font-medium mb-4">Are you safe right now?</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, isSafe: true})}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${formData.isSafe === true ? 'bg-green-50 border-green-400 text-green-700 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  Yes, I am safe
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, isSafe: false})}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${formData.isSafe === false ? 'bg-red-50 border-red-400 text-red-700 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  No, I need help
                </button>
              </div>
              
              {formData.isSafe === false && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 flex items-start gap-2"
                >
                  <span>🚨</span>
                  <div>
                    <strong>Please prioritize your safety.</strong>
                    <p className="mt-1">If you are in immediate danger, please call emergency services or campus security immediately.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1"
            >
              <label className="block text-gray-700 font-medium mb-3">Anything else you'd like to share? (Optional)</label>
              <textarea
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-400 outline-none resize-none transition-all"
                placeholder="Take your time..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-4 border-t border-gray-50">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg text-gray-600 font-medium transition-colors ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            Back
          </button>
          
          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              className={`px-6 py-2 rounded-lg font-medium transition-all shadow-sm ${
                !canProceed() 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md hover:opacity-90'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}