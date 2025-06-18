
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
      <div className="bg-black/70 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-blue-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        
        <div className="flex items-end space-x-1 h-16 relative z-10">
          {bars.map((height, index) => (
            <div
              key={index}
              className="w-2 bg-gradient-to-t from-blue-500 via-cyan-400 to-purple-400 rounded-full transition-all duration-100 ease-out shadow-lg shadow-blue-500/30"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          ))}
        </div>
        <p className="text-center text-blue-300 mt-6 font-medium text-lg relative z-10">
          Listening...
        </p>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
};
