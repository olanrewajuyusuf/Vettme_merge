import { useState, useRef, useEffect } from 'react';
import './style/ChatPrompt.css'; 

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Customize bot responses here
const BOT_RESPONSES = {
  greetings: ["Hello! How can I assist you today?", "Hi there! What can I do for you?", "Welcome back! How can I help?"],
  help: [
    "I can help you navigate the dashboard, explain features, or answer questions about your data.",
    "You can ask me about charts, statistics, or how to use specific dashboard tools."
  ],
  unknown: [
    "I'm not sure I understand. Could you rephrase that?",
    "I'm still learning. Could you ask that differently?",
    "I don't have an answer for that yet, but I'm happy to help with dashboard-related questions."
  ],
  dataRequests: {
    sales: "Your current sales data shows a 15% increase from last month. Would you like to see the detailed report?",
    users: "There are currently 1,243 active users in the system. 85% are monthly active users.",
    performance: "System performance is at 98.7% uptime this month with average response time of 320ms."
  },
  farewell: ["Goodbye! Come back if you need anything.", "Have a great day!", "Thanks for chatting! Feel free to return anytime."]
};

export default function ChatPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: getRandomResponse(BOT_RESPONSES.greetings),
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (/hello|hi|hey|greetings/.test(lowerMsg)) {
      return getRandomResponse(BOT_RESPONSES.greetings);
    }
    
    if (/help|support|assist/.test(lowerMsg)) {
      return getRandomResponse(BOT_RESPONSES.help);
    }
    
    if (/bye|goodbye|see you|later/.test(lowerMsg)) {
      return getRandomResponse(BOT_RESPONSES.farewell);
    }
    
    if (/sales|revenue|income/.test(lowerMsg)) {
      return BOT_RESPONSES.dataRequests.sales;
    }
    
    if (/users|customers|clients/.test(lowerMsg)) {
      return BOT_RESPONSES.dataRequests.users;
    }
    
    if (/performance|status|uptime/.test(lowerMsg)) {
      return BOT_RESPONSES.dataRequests.performance;
    }
    
    if (/thank|thanks|appreciate/.test(lowerMsg)) {
      return "You're welcome! Is there anything else I can help with?";
    }
    
    return getRandomResponse(BOT_RESPONSES.unknown);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Generate and send bot response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800 + Math.random() * 700); // Random delay between 800-1500ms for more natural feel
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`chat-prompt-container ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Dashboard Assistant</h3>
            <button className="close-button" onClick={toggleChat}>
              ×
            </button>
          </div>
          <div className="messages-container">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-area">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={3}
            />
            <button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <button className="chat-toggle-button" onClick={toggleChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
}