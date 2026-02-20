import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  // Mock Data
  const stabilityIndex = 7.8;
  const stabilityTrend = '+0.4';

  const weeklyMoods = [
    { day: 'Mon', happy: 40, neutral: 30, stressed: 30 },
    { day: 'Tue', happy: 35, neutral: 40, stressed: 25 },
    { day: 'Wed', happy: 50, neutral: 30, stressed: 20 },
    { day: 'Thu', happy: 45, neutral: 35, stressed: 20 },
    { day: 'Fri', happy: 60, neutral: 20, stressed: 20 },
  ];

  const departmentRisk = [
    { name: 'Engineering', risk: 'High', score: 85, color: 'bg-red-500' },
    { name: 'Design', risk: 'Low', score: 20, color: 'bg-green-500' },
    { name: 'Marketing', risk: 'Medium', score: 45, color: 'bg-yellow-500' },
    { name: 'HR', risk: 'Low', score: 15, color: 'bg-green-500' },
    { name: 'Sales', risk: 'Medium', score: 55, color: 'bg-yellow-500' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Admin Portal
          </h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {['Overview', 'Analytics', 'Student Reports', 'Faculty Risks', 'Settings'].map((item, index) => (
            <a
              key={item}
              href="#"
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                index === 0 
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-2">
            <span>←</span> Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-500 text-sm">Welcome back, Administrator.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Emotional Stability Index Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-10 -mt-10 opacity-50"></div>
            <h3 className="text-gray-500 text-sm font-medium relative z-10">Emotional Stability Index</h3>
            <div className="mt-4 flex items-end justify-between relative z-10">
              <span className="text-4xl font-bold text-gray-800">{stabilityIndex}</span>
              <span className="text-green-500 text-sm font-bold bg-green-50 px-2 py-1 rounded-full">▲ {stabilityTrend}</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: `${stabilityIndex * 10}%` }}></div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          {[
            { label: 'Active Check-ins', value: '1,248', change: '+12%', color: 'text-blue-600' },
            { label: 'Pending Reports', value: '15', change: '-2', color: 'text-orange-500' },
            { label: 'Resolved Cases', value: '342', change: '+5%', color: 'text-green-600' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                <span className={`text-sm font-medium ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Weekly Mood Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Weekly Mood Distribution</h3>
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
              {weeklyMoods.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col justify-end gap-1 group cursor-pointer">
                  <div className="w-full bg-green-400 rounded-t-sm opacity-90 hover:opacity-100 transition-all relative" style={{ height: `${day.happy}%` }}>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded transition-opacity">{day.happy}%</div>
                  </div>
                  <div className="w-full bg-gray-200 opacity-90 hover:opacity-100 transition-all" style={{ height: `${day.neutral}%` }}></div>
                  <div className="w-full bg-red-400 rounded-b-sm opacity-90 hover:opacity-100 transition-all" style={{ height: `${day.stressed}%` }}></div>
                  <span className="text-xs text-gray-500 text-center mt-2 font-medium">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-6 border-t border-gray-50 pt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-400 rounded-full"></div><span className="text-sm text-gray-600">Positive</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 rounded-full"></div><span className="text-sm text-gray-600">Neutral</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded-full"></div><span className="text-sm text-gray-600">Negative</span></div>
            </div>
          </div>

          {/* Department Risk Heat Indicator */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Department Risk Levels</h3>
            <div className="space-y-5">
              {departmentRisk.map((dept) => (
                <div key={dept.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${dept.risk === 'High' ? 'bg-red-100 text-red-700' : dept.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{dept.risk}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${dept.color}`} style={{ width: `${dept.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complaint Trend Line Graph */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Complaint Trends</h3>
            <select className="text-sm border-gray-200 rounded-md text-gray-500 bg-gray-50 px-2 py-1"><option>Last 7 Days</option></select>
          </div>
          <div className="h-48 w-full relative">
            {/* CSS/SVG Line Chart */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,50 L0,40 L16,35 L32,38 L48,25 L64,28 L80,15 L100,20 L100,50 Z" fill="url(#gradient)" />
              <polyline fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points="0,40 16,35 32,38 48,25 64,28 80,15 100,20" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 transform translate-y-6">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}