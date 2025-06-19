
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();

  const sendMessage = async (messages: Message[]): Promise<string> => {
    if (!session) {
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat-completion', {
        body: { messages }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error('Failed to get AI response');
      }

      return data.response;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading
  };
};
