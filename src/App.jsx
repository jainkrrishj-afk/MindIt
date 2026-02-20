import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MoodCheckIn from './components/MoodCheckIn';
import ReportForm from './components/ReportForm';
import ChatUI from './components/ChatUI';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Standalone Component Routes */}
          <Route path="/mood" element={
            <div className="max-w-2xl mx-auto px-4 py-8">
              <MoodCheckIn />
            </div>
          } />
          
          <Route path="/report" element={
            <div className="max-w-2xl mx-auto px-4 py-8">
              <ReportForm />
            </div>
          } />
          
          <Route path="/chat" element={
            <div className="max-w-2xl mx-auto px-4 py-8">
              <ChatUI />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;