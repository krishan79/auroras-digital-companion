
import React, { useState, useEffect, useRef } from "react";

interface ExtendedWindow extends Window {
  webkitSpeechRecognition: any;
}

interface VoiceRecognitionProps {
  onTranscript: (transcript: string) => void;
  onListeningChange: (isListening: boolean) => void;
  isListening: boolean;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ 
  onTranscript, 
  onListeningChange, 
  isListening 
}) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as ExtendedWindow).SpeechRecognition ||
      (window as ExtendedWindow).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      if (transcript.toLowerCase().includes('hey jarvis')) {
        onListeningChange(true);
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech Recognition Error:", event.error);
      onListeningChange(false);
    };

    recognition.onend = () => {
      console.log("Recognition ended.");
      if (isListening) {
        recognition.start(); // restart if still supposed to listen
      }
    };

    recognitionRef.current = recognition;

    // Start passive listening for wake word
    recognition.start();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onListeningChange, isListening]);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  // Expose methods to parent via useEffect
  useEffect(() => {
    if (isListening) {
      startListening();
    } else {
      stopListening();
    }
  }, [isListening]);

  return null; // This component doesn't render anything visible
};

export default VoiceRecognition;
