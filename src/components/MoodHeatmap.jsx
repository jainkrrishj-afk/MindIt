import React from 'react';

export default function MoodHeatmap() {
  // Mock data for 7 days
  const moodData = [
    { date: 'Mon', mood: 'Calm', intensity: 'low' },
    { date: 'Tue', mood: 'Neutral', intensity: 'medium' },
    { date: 'Wed', mood: 'High Stress', intensity: 'high' },
    { date: 'Thu', mood: 'Calm', intensity: 'low' },
    { date: 'Fri', mood: 'Calm', intensity: 'low' },
    { date: 'Sat', mood: 'Neutral', intensity: 'medium' },
    { date: 'Sun', mood: 'High Stress', intensity: 'high' },
  ];

  const getColor = (intensity) => {
    switch (intensity) {
      case 'low': return 'bg-green-400 hover:bg-green-500';
      case 'medium': return 'bg-yellow-400 hover:bg-yellow-500';
      case 'high': return 'bg-red-400 hover:bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Mood Intensity</h3>
      
      <div className="flex justify-between items-end gap-2">
        {moodData.map((day, index) => (
          <div key={index} className="relative group flex-1">
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-max">
              <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg text-center">
                <p className="font-semibold">{day.date}</p>
                <p>{day.mood}</p>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
            
            {/* Heatmap Square */}
            <div 
              className={`h-12 w-full rounded-md cursor-pointer transition-all duration-200 ${getColor(day.intensity)}`}
            ></div>
            <p className="text-xs text-gray-400 text-center mt-2">{day.date}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-400 rounded-sm"></div> Calm</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> Neutral</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-400 rounded-sm"></div> High Stress</div>
      </div>
    </div>
  );
}