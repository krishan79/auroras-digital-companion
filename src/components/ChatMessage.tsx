
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
        "max-w-[70%] rounded-lg p-4 break-words",
        isUser 
          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
          : "bg-gray-800/50 text-gray-100 border border-gray-700"
      )}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
            <span className="text-sm font-medium text-blue-400">JARVIS</span>
          </div>
        )}
        <p className="leading-relaxed">{message.text}</p>
        <p className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-blue-100" : "text-gray-400"
        )}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
