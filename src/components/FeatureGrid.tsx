
import { Card } from '@/components/ui/card';
import { Search, Calendar, Bell, Cloud, Cog, Headphones } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Web Search & Research",
    description: "Real-time web searches, news updates, and comprehensive research assistance"
  },
  {
    icon: Calendar,
    title: "Schedule Management", 
    description: "Smart calendar planning, meeting scheduling, and reminder management"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Intelligent alerts, task reminders, and priority-based notifications"
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless integration with cloud services and data synchronization"
  },
  {
    icon: Cog,
    title: "Smart Home Control",
    description: "IoT device management, home automation, and environmental controls"
  },
  {
    icon: Headphones,
    title: "Voice Interaction",
    description: "Natural speech recognition and expressive text-to-speech responses"
  }
];

export const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card 
            key={index}
            className="bg-black/20 backdrop-blur-xl border border-white/10 p-6 hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:border-blue-400/50 group relative overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center space-x-3 mb-4 relative z-10">
              <div className="p-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">{feature.title}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed relative z-10 group-hover:text-gray-200 transition-colors duration-300">
              {feature.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
