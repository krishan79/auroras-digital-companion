
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { VoiceVisualizer } from '@/components/VoiceVisualizer';
import { ChatMessage } from '@/components/ChatMessage';
import { FeatureGrid } from '@/components/FeatureGrid';
import VoiceRecognition from '@/components/VoiceRecognition';
import { useAuth } from '@/contexts/AuthContext';
import { useOpenAI } from '@/hooks/useOpenAI';
import { Mic, MicOff, Settings, LogOut, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const { sendMessage, isLoading: isProcessing } = useOpenAI();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTranscript = (transcript: string) => {
    if (transcript.toLowerCase().includes('hey jarvis')) {
      toast({ title: "JARVIS Activated", description: "Listening for your command..." });
      // Extract the command after "hey jarvis"
      const command = transcript.toLowerCase().replace('hey jarvis', '').trim();
      if (command) {
        setInputText(command);
        handleSendMessage(command);
      }
    }
  };

  const handleListeningChange = (listening: boolean) => {
    setIsListening(listening);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      toast({ title: "Listening...", description: "Speak your command" });
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      // Convert messages to OpenAI format
      const openAIMessages = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));
      
      // Add the current user message
      openAIMessages.push({
        role: 'user' as const,
        content: textToSend
      });

      const aiResponse = await sendMessage(openAIMessages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        type: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response from JARVIS. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Voice Recognition Component */}
      <VoiceRecognition 
        onTranscript={handleTranscript}
        onListeningChange={handleListeningChange}
        isListening={isListening}
      />

      {/* Enhanced Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
              <div className="absolute inset-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              JARVIS
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 hidden sm:block font-light">
              Welcome, {user?.email}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-white/10 transition-all duration-300">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-xl border-white/20 shadow-2xl shadow-blue-500/20">
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer transition-all duration-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleSignOut}
                  className="text-white hover:bg-white/10 cursor-pointer transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-32 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          {/* Enhanced Welcome Section */}
          {messages.length === 0 && (
            <div className="text-center mb-12">
              <div className="mb-8">
                <div className="relative mx-auto mb-8">
                  <div className="w-40 h-40 mx-auto bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full animate-pulse shadow-2xl shadow-blue-500/50">
                    <div className="absolute inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/10"></div>
                    <div className="absolute inset-6 bg-white/5 rounded-full backdrop-blur-sm"></div>
                  </div>
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                </div>
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Good Evening, Sir
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
                  I'm JARVIS, your AI-powered personal assistant. I can help you with web searches, smart home control, 
                  task automation, and much more. Try saying "Hey JARVIS" or type your command below.
                </p>
                <div className="w-48 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mx-auto mt-6 rounded-full opacity-70"></div>
              </div>
              <FeatureGrid />
            </div>
          )}

          {/* Enhanced Chat Messages */}
          {messages.length > 0 && (
            <Card className="bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/20 mb-6 max-h-96 overflow-y-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-lg"></div>
              <div className="p-6 space-y-4 relative z-10">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isProcessing && (
                  <div className="flex items-center space-x-3 text-blue-400">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span>JARVIS is thinking...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Voice Visualizer */}
      {isListening && <VoiceVisualizer />}

      {/* Enhanced Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/10 p-4 shadow-2xl shadow-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask JARVIS anything..."
                className="bg-black/20 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 resize-none min-h-[60px] focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                rows={2}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleVoiceToggle}
                size="icon"
                className={`w-12 h-12 rounded-full transition-all duration-300 shadow-lg ${
                  isListening 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse shadow-red-500/30' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/30'
                } transform hover:scale-105`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isProcessing}
                className="px-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:from-blue-600 hover:via-cyan-600 hover:to-purple-600 disabled:opacity-50 shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
