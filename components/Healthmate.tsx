// pages/index.tsx
import { useState } from 'react';
import Head from 'next/head';
import Sidebar from './Footer/Slider';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function Home() {
  //const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = (text: string) => {
    // In a real app, you would handle API calls here
    console.log(`User: ${text}`);
    setInputValue('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Sidebar/>
      <Head>
        <title>HealthMate</title>
        <meta name="description" content="Your health assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 border border-blue-800 rounded-lg my-4">
        {/* Header */}
        <div className="text-center mb-8 pb-4">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">HealthMate</h1>
          <div className="inline-flex items-center bg-black rounded-full px-3 py-1 border border-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 mb-4 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {/* Initial bot message */}
            <div className="bg-blue-600 text-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg self-start max-w-[80%] shadow">
              <p>How can I assist you with your health today?</p>
            </div>
            
            {/* Quick options */}
            <div className="flex flex-col gap-2">
              <button 
                className="bg-white text-blue-500 border border-blue-500 font-bold rounded-full px-3 py-2 text-sm inline-flex items-center self-start"
                onClick={() => handleSendMessage("Check Vital Signs")}
              >
                Check Vital Signs 🩺
              </button>
              <button 
                className="bg-white text-blue-500 border border-blue-500 font-bold rounded-full px-3 py-2 text-sm inline-flex items-center self-start"
                onClick={() => handleSendMessage("Monitor Health Trends")}
              >
                Monitor Health Trends 📈
              </button>
              <button 
                className="bg-white text-blue-500 border border-blue-500 font-bold rounded-full px-3 py-2 text-sm inline-flex items-center self-start"
                onClick={() => handleSendMessage("Health Alerts")}
              >
                Health Alerts 🔔
              </button>
              <button 
                className="bg-white text-blue-500 border border-blue-500 font-bold rounded-full px-3 py-2 text-sm inline-flex items-center self-start"
                onClick={() => handleSendMessage("Upload Medical Reports")}
              >
                Upload Medical Reports 📋
              </button>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative bg-gray-800 text-white rounded-full px-4 py-3 pr-36 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-[90%] bg-transparent focus:outline-none text-sm text-white placeholder-gray-400"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                handleSendMessage(inputValue);
              }
            }}
          />
          <div className="absolute right-2 bottom-2 flex space-x-3 items-center">
            {/* Smile/Emoji Icon */}
            <button className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </button>
            
            {/* Microphone Icon */}
            <button className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            
            {/* Attachment/Link Icon */}
            <button className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </button>
            
            {/* Plus/Add Icon */}
            <button className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
            
            {/* Send Icon (Paper Plane) */}
            <button 
              className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600"
              onClick={() => {
                if (inputValue.trim()) {
                  handleSendMessage(inputValue);
                }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}