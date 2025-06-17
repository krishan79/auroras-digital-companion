
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
            className="bg-black/20 backdrop-blur-md border-blue-500/30 p-6 hover:bg-black/30 transition-all duration-300 hover:scale-105 hover:border-blue-400/50"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {feature.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
