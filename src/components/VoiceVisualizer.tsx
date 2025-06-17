
import { useEffect, useState } from 'react';

export const VoiceVisualizer = () => {
  const [bars, setBars] = useState<number[]>(new Array(20).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="bg-black/60 backdrop-blur-lg rounded-full p-8">
        <div className="flex items-end space-x-1 h-16">
          {bars.map((height, index) => (
            <div
              key={index}
              className="w-2 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-100 ease-out"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          ))}
        </div>
        <p className="text-center text-blue-400 mt-4 font-medium">
          Listening...
        </p>
      </div>
    </div>
  );
};
