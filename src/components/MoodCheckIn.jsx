import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState(null);
  
  const moods = [
    { label: 'Very Happy', emoji: '🤩', color: 'hover:bg-green-100 dark:hover:bg-green-900', selectedColor: 'bg-green-100 dark:bg-green-900' },
    { label: 'Happy', emoji: '🙂', color: 'hover:bg-blue-100 dark:hover:bg-blue-900', selectedColor: 'bg-blue-100 dark:bg-blue-900' },
    { label: 'Neutral', emoji: '😐', color: 'hover:bg-gray-100 dark:hover:bg-gray-700', selectedColor: 'bg-gray-100 dark:bg-gray-700' },
    { label: 'Stressed', emoji: '😓', color: 'hover:bg-orange-100 dark:hover:bg-orange-900', selectedColor: 'bg-orange-100 dark:bg-orange-900' },
    { label: 'Very Stressed', emoji: '😫', color: 'hover:bg-red-100 dark:hover:bg-red-900', selectedColor: 'bg-red-100 dark:bg-red-900' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">How are you feeling?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around gap-2 mb-6">
          {moods.map((mood) => (
            <motion.div
              key={mood.label}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className={cn(
                  "flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 transition-all duration-200",
                  selectedMood?.label === mood.label ? mood.selectedColor : mood.color
                )}
                aria-label={mood.label}
                onClick={() => setSelectedMood(mood)}
              >
                <span className="text-4xl">{mood.emoji}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        {selectedMood && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-center"
          >
            <div className={cn("p-3 rounded-lg inline-block", selectedMood.selectedColor)}>
              <p className="font-medium">
                You're feeling <strong>{selectedMood.label}</strong>
              </p>
            </div>
            <p className="text-muted-foreground text-sm mt-2">Thanks for sharing. Your mood has been recorded.</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}