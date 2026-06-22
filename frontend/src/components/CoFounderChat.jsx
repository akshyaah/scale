import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, RefreshCw, Sparkles, Bot, User } from 'lucide-react';
import { publicSendChatMessage, publicGetChatHistory, publicClearChatHistory } from '../utils/api';

export default function CoFounderChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize session ID
  useEffect(() => {
    let sId = sessionStorage.getItem('vpChatSessionId');
    if (!sId) {
      sId = 'session_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('vpChatSessionId', sId);
    }
    setSessionId(sId);
  }, []);

  // Fetch history when chat is opened
  useEffect(() => {
    if (isOpen && sessionId) {
      loadHistory();
    }
  }, [isOpen, sessionId]);

  // Scroll to bottom when history changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const loadHistory = async () => {
    try {
      const history = await publicGetChatHistory(sessionId);
      if (history.length === 0) {
        // Seed initial message if empty
        setChatHistory([
          {
            role: 'model',
            content: "Hello! I am your AI Co-Founder. How can I help you validate ideas, evaluate markets, or map out financial projections today?",
            createdAt: new Date().toISOString()
          }
        ]);
      } else {
        setChatHistory(history);
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend) => {
    const text = textToSend || message;
    if (!text.trim()) return;

    if (!textToSend) {
      setMessage('');
    }

    // Optimistically add user message
    const userMsg = { role: 'user', content: text, createdAt: new Date().toISOString() };
    setChatHistory((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await publicSendChatMessage(text, sessionId);
      const assistantMsg = { role: 'model', content: response.reply, createdAt: new Date().toISOString() };
      setChatHistory((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Failed to get chat reply:', err);
      const errorMsg = { role: 'model', content: 'Sorry, I encountered an error. Please try again.', createdAt: new Date().toISOString() };
      setChatHistory((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear your conversation history?')) {
      try {
        await publicClearChatHistory(sessionId);
        setChatHistory([
          {
            role: 'model',
            content: "Hello! I am your AI Co-Founder. How can I help you validate ideas, evaluate markets, or map out financial projections today?",
            createdAt: new Date().toISOString()
          }
        ]);
      } catch (err) {
        console.error('Failed to clear chat history:', err);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickPrompts = [
    { label: 'Start with ₹50,000', text: 'How do I start a business with a small budget of ₹50,000?' },
    { label: 'Validate Idea', text: 'What is the best way to validate a startup idea without coding?' },
    { label: 'Improve Profitability', text: 'How can I optimize pricing and costs to increase my business profit margin?' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-brand shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
          title="Talk to AI Co-Founder"
        >
          <MessageSquare className="w-6 h-6 animate-pulse-subtle" />
        </button>
      )}

      {/* Expanded Chat Dialog */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[550px] rounded-2xl glass border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-float">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-brand-500/80 to-brand-600/80 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white leading-none">AI Co-Founder</h3>
                <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Active Mentor
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/75 hover:text-white transition-colors"
                title="Clear Conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/75 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Panel */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-[#0a0f1d]/60">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 border border-slate-700 text-emerald-400'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600/90 text-white font-medium rounded-tr-none'
                      : 'bg-slate-800/90 border border-slate-700/50 text-slate-100 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-800/90 border border-slate-700/50 rounded-xl rounded-tl-none px-3.5 py-3 flex items-center gap-1.5">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Panel (Visible only when history is small or chatbot is ready) */}
          {chatHistory.length <= 2 && !loading && (
            <div className="px-4 py-2 border-t border-slate-800 bg-[#070b16]/80 space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Quick Inquiries</p>
              <div className="flex flex-col gap-1">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p.text)}
                    className="text-left text-[11px] text-indigo-300 hover:text-white bg-indigo-950/20 hover:bg-indigo-900/30 border border-indigo-500/20 px-2.5 py-1.5 rounded-lg transition-colors font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Panel */}
          <div className="p-3 border-t border-slate-800 bg-[#070b16] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask for startup advice..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
              className="flex-grow glass-input px-3.5 py-2 text-xs"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !message.trim()}
              className="p-2 rounded-lg bg-gradient-brand text-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-md shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
