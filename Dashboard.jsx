import React from 'react';
import MoodCheckIn from '../components/MoodCheckIn';
import ReportForm from '../components/ReportForm';
import ChatUI from '../components/ChatUI';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <MoodCheckIn />
          <ReportForm />
        </div>
        <div className="h-full">
          <ChatUI />
        </div>
      </div>
    </div>
  );
}