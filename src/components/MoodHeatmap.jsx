import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

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
    <Card>
      <CardHeader>
        <CardTitle>Weekly Mood Intensity</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex justify-between items-end gap-2">
            {moodData.map((day, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="relative group flex-1">
                    <div
                      className={`h-12 w-full rounded-md cursor-pointer transition-all duration-200 ${getColor(day.intensity)}`}
                    ></div>
                    <p className="text-xs text-muted-foreground text-center mt-2">{day.date}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{day.mood}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <div className="flex justify-center gap-4 mt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-400 rounded-sm"></div> Calm</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> Neutral</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-400 rounded-sm"></div> High Stress</div>
        </div>
      </CardContent>
    </Card>
  );
}