
import { toast } from '@/hooks/use-toast';

interface CommandAction {
  pattern: string;
  action: () => void | Promise<void>;
  description: string;
}

export const useCommandExecutor = () => {
  const commands: CommandAction[] = [
    {
      pattern: 'youtube',
      action: () => window.open('https://youtube.com', '_blank'),
      description: 'Open YouTube'
    },
    {
      pattern: 'google',
      action: () => window.open('https://google.com', '_blank'),
      description: 'Open Google'
    },
    {
      pattern: 'github',
      action: () => window.open('https://github.com', '_blank'),
      description: 'Open GitHub'
    },
    {
      pattern: 'time',
      action: () => {
        const now = new Date().toLocaleTimeString();
        toast({ title: "Current Time", description: now });
      },
      description: 'Show current time'
    },
    {
      pattern: 'date',
      action: () => {
        const now = new Date().toLocaleDateString();
        toast({ title: "Current Date", description: now });
      },
      description: 'Show current date'
    }
  ];

  const executeCommand = async (text: string): Promise<boolean> => {
    const lowerText = text.toLowerCase();
    
    for (const command of commands) {
      if (lowerText.includes(command.pattern)) {
        try {
          await command.action();
          toast({
            title: "Command Executed",
            description: command.description
          });
          return true;
        } catch (error) {
          console.error(`Error executing command ${command.pattern}:`, error);
          toast({
            title: "Command Failed",
            description: `Failed to execute: ${command.description}`,
            variant: "destructive"
          });
          return false;
        }
      }
    }
    
    return false;
  };

  const getAvailableCommands = () => commands.map(cmd => cmd.description);

  return {
    executeCommand,
    getAvailableCommands
  };
};
