
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { session } = useAuth();

  const speak = async (text: string, voice: string = 'Aria'): Promise<void> => {
    if (!session) {
      throw new Error('User not authenticated');
    }

    if (!text.trim()) return;

    setIsSpeaking(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice }
      });

      if (error) {
        console.error('TTS function error:', error);
        throw new Error('Failed to generate speech');
      }

      // Convert base64 to audio and play
      const audioData = `data:audio/mpeg;base64,${data.audioContent}`;
      const audio = new Audio(audioData);
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          setIsSpeaking(false);
          resolve();
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          reject(new Error('Audio playback failed'));
        };
        audio.play().catch(reject);
      });
    } catch (error) {
      setIsSpeaking(false);
      console.error('TTS error:', error);
      throw error;
    }
  };

  return {
    speak,
    isSpeaking
  };
};
