
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === 'user';

  return (
    <div className={cn(
      "flex w-full",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-xl p-4 break-words relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl",
        isUser 
          ? "bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 text-white shadow-blue-500/30 hover:shadow-blue-500/40" 
          : "bg-black/30 backdrop-blur-xl text-gray-100 border border-white/10 shadow-blue-500/20 hover:shadow-blue-500/30"
      )}>
        {!isUser && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
            <div className="flex items-center space-x-2 mb-2 relative z-10">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-500/30"></div>
              <span className="text-sm font-medium text-blue-400">JARVIS</span>
            </div>
          </>
        )}
        <p className="leading-relaxed relative z-10">{message.text}</p>
        <p className={cn(
          "text-xs mt-2 opacity-70 relative z-10",
          isUser ? "text-blue-100" : "text-gray-400"
        )}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
