import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl text-center p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg">
          Campus Emotional Ecosystem
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          A proactive space to nurture your mental well-being. We help you identify and address emotional shifts before they escalate.
        </p>
        
        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 border border-white/30 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-lg backdrop-blur-md"
          >
            Check In Now
          </motion.button>
        </Link>
      </motion.div>

      <div className="absolute bottom-6 text-blue-200/50 text-sm">
        <p>Safe • Confidential • Supportive</p>
      </div>
    </div>
  );
}