
'use client';

import React, {useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Send} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';
import {answerFanQuestions} from '@/ai/flows/answer-fan-questions';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const {toast} = useToast();

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');

    try {
      const response = await answerFanQuestions({question: input});
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: response.answer,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error: any) {
      console.error('Error getting response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response from AI.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>FuriaChat</CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <ScrollArea className="h-[calc(100vh-250px)] p-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col items-${message.isUser ? 'end' : 'start'}`}
                >
                  <div
                    className={`rounded-lg p-3 w-fit max-w-[80%] ${
                      message.isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{message.isUser ? 'You' : 'FuriaChat'}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="p-4 flex items-center border-t">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow mr-2 rounded-lg"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} aria-label="Send message">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
