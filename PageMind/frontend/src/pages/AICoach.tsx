import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { aiApi } from '../lib/api';
import type { AIChatResponse } from '../lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AICoach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Reading Coach. I can help you find your next book, reflect on your recent reads, or analyze your reading habits. What's on your mind?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | undefined>();
  const [suggestions, setSuggestions] = useState<string[]>([
    "What should I read next?",
    "Give me a growth insight",
    "How am I progressing?"
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiApi.chat(text, conversationId);
      setConversationId(response.conversation_id);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.response
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      if (response.suggestions && response.suggestions.length > 0) {
        setSuggestions(response.suggestions);
      }
    } catch (error) {
      console.error("Failed to send message", error);
      // Handle error visually if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto animate-fade-in">
      <div className="page-header mb-4">
        <h1 className="text-4xl font-bold font-serif mb-2 flex items-center gap-3">
          AI Reading Coach <Sparkles className="text-amber-500" />
        </h1>
        <p className="text-gray-400">Your personal guide for reading and growth.</p>
      </div>

      <div className="card flex-1 flex flex-col overflow-hidden p-0 border-white/10 bg-black/20">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' 
                  ? 'bg-amber-500/20 text-amber-500' 
                  : 'bg-violet-500/20 text-violet-500'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-black rounded-tr-sm'
                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm whitespace-pre-wrap'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-500 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-black/40">
          {suggestions.length > 0 && !isLoading && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-amber-500/20 hover:text-amber-500 hover:border-amber-500/50 transition-colors"
                  onClick={() => handleSend(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <div className="relative">
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
              placeholder="Ask anything about your books or goals..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(input);
              }}
              disabled={isLoading}
            />
            <button
              className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black hover:bg-amber-400 transition-colors disabled:opacity-50"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
