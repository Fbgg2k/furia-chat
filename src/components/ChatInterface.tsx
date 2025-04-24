
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
import {getAIResponse} from '@/services/ai';
import {listFuriaPlayers} from '@/ai/flows/list-furia-players';

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
      id: Math.random().toString(),
      text: input,
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');

    // Add user message to the messages state
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear the input
    setInput('');

    console.log("Sending message to AI:", input);
    
    let aiResponse = "";
    if (input.toLocaleLowerCase().includes("list players")) {
      const players = await listFuriaPlayers();
      aiResponse = `The current players are: ${players.join(", ")}`;
    } else {
      aiResponse = await getAIResponse(input);
    }
    
    console.log("AI response:", aiResponse);
    
    const aiMessage: ChatMessage = {
      id: Math.random().toString(),
      text: aiResponse,
      isUser: false,
    };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
  };

  return (
    <div className="flex flex-col flex-grow">
        <Card className="h-full">
            
        
        

        <CardHeader>
          <CardTitle>FuriaChat</CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <ScrollArea className="h-[calc(100vh-250px)] p-4">
            <div className="flex flex-col gap-4 pb-1">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex flex-col items-${message.isUser ? 'end' : 'start'} `}
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
