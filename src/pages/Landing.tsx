
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FeatureGrid } from '@/components/FeatureGrid';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Mic, Brain, Zap, Shield, Globe, Users } from 'lucide-react';

const Landing = () => {
  const { user, loading } = useAuth();

  // Redirect authenticated users to the main app
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full animate-pulse mx-auto mb-4 shadow-2xl shadow-blue-500/50"></div>
          <p className="text-gray-300">Loading JARVIS...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced GPT-4o integration for natural conversation and complex task understanding"
    },
    {
      icon: Mic,
      title: "Voice & Text Input",
      description: "Seamless voice recognition and text processing for natural interaction"
    },
    {
      icon: Zap,
      title: "Task Automation",
      description: "Automate your daily tasks, schedule management, and personal workflows"
    },
    {
      icon: Globe,
      title: "Real-time Web Search",
      description: "Live web searches, news updates, and comprehensive research assistance"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure with enterprise-grade encryption and privacy controls"
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description: "Learns your preferences and adapts to provide personalized assistance"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
              <div className="absolute inset-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              JARVIS
            </h1>
          </div>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-12">
            <div className="relative mx-auto mb-8">
              <div className="w-48 h-48 mx-auto bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full animate-pulse shadow-2xl shadow-blue-500/50">
                <div className="absolute inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10"></div>
                <div className="absolute inset-8 bg-white/5 rounded-full backdrop-blur-sm"></div>
              </div>
              <div className="absolute -inset-12 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Meet JARVIS
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              Your AI-Powered Personal Assistant
            </p>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Experience the future of personal assistance with advanced AI capabilities, 
              voice interaction, smart home control, and seamless task automation. 
              JARVIS understands natural language and helps you accomplish more with less effort.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:from-blue-600 hover:via-cyan-600 hover:to-purple-600 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-4">
                  Start Your Journey
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300 text-lg px-8 py-4"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes JARVIS the most advanced AI assistant for your daily needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="bg-black/20 backdrop-blur-xl border border-white/10 p-6 hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:border-blue-400/50 group relative overflow-hidden shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
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

          {/* Original Feature Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-white">Complete Feature Set</h3>
            <p className="text-gray-400 mb-8">Everything you need for a comprehensive AI assistant experience</p>
          </div>
          <FeatureGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-white/20 p-12 shadow-2xl shadow-blue-500/20">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join the future of personal assistance. Experience JARVIS today and transform how you interact with technology.
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:from-blue-600 hover:via-cyan-600 hover:to-purple-600 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 text-lg px-12 py-4">
                Launch JARVIS
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              JARVIS
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 JARVIS AI Assistant. Powered by advanced artificial intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
