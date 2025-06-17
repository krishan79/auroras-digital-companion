
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { VoiceVisualizer } from '@/components/VoiceVisualizer';
import { ChatMessage } from '@/components/ChatMessage';
import { FeatureGrid } from '@/components/FeatureGrid';
import VoiceRecognition from '@/components/VoiceRecognition';
import { Mic, MicOff, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTranscript = (transcript: string) => {
    if (transcript.toLowerCase().includes('hey jarvis')) {
      toast({ title: "JARVIS Activated", description: "Listening for your command..." });
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

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you want me to: "${inputText}". I'm processing your request and will execute it shortly. This is a placeholder response - in the full implementation, I'll integrate with OpenAI GPT-4o and other APIs to provide real functionality.`,
        type: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Voice Recognition Component */}
      <VoiceRecognition 
        onTranscript={handleTranscript}
        onListeningChange={handleListeningChange}
        isListening={isListening}
      />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-blue-500/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              JARVIS
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          {messages.length === 0 && (
            <div className="text-center mb-12">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse mb-6 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm"></div>
                </div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Good Evening, Sir
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  I'm JARVIS, your AI-powered personal assistant. I can help you with web searches, smart home control, 
                  task automation, and much more. Try saying "Hey JARVIS" or type your command below.
                </p>
              </div>
              <FeatureGrid />
            </div>
          )}

          {/* Chat Messages */}
          {messages.length > 0 && (
            <Card className="bg-black/40 backdrop-blur-md border-blue-500/30 mb-6 max-h-96 overflow-y-auto">
              <div className="p-6 space-y-4">
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
                    <span>JARVIS is processing...</span>
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

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-blue-500/30 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask JARVIS anything..."
                className="bg-gray-800/50 border-blue-500/30 text-white placeholder-gray-400 resize-none min-h-[60px] focus:border-blue-400"
                rows={2}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleVoiceToggle}
                size="icon"
                className={`w-12 h-12 rounded-full transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isProcessing}
                className="px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
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
