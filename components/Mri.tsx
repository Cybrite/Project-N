import { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageSquarePlus, Settings, LogOut, HeartPulse, Trash2, Minimize2, Maximize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string; // Base64 encoded image
};

type CTAnalysisData = {
  classification: string;
  confidence: number;
  session_id: string;
  explanation?: string;
};

type ChatHistoryItem = {
  id: string;
  title: string;
  timestamp: Date;
  sessionId: string | null;
  messages: Message[];
};

export default function Mri() {
  const [inputValue, setInputValue] = useState<string>('');
  const [initialMessage] = useState<string>('Welcome to the MRI Analysis section. Please upload a MRI scan image first to begin analysis and discussion.');
  const apiUrl = "https://mri-662622027382.europe-west1.run.app";
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageMinimized, setIsImageMinimized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [ctData, setCTData] = useState<CTAnalysisData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [isAnalysisMinimized, setIsAnalysisMinimized] = useState<boolean>(false);
  const router = useRouter();
  
  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, [initialMessage]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleAnalysisMinimize = () => setIsAnalysisMinimized(!isAnalysisMinimized);
  const toggleImageMinimize = () => setIsImageMinimized(!isImageMinimized);
  
  const handleNewChat = () => {
    if (messages.length > 1) {
      const firstUserMessage = messages.find(msg => msg.sender === 'user');
      const chatTitle = firstUserMessage 
        ? firstUserMessage.text.slice(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '')
        : 'New Chat';
      
      const newChatItem: ChatHistoryItem = {
        id: generateId(),
        title: chatTitle,
        timestamp: new Date(),
        sessionId,
        messages
      };

      setChatHistory(prev => [newChatItem, ...prev]);
    }

    clearChat();
  };

  const loadChat = (chatId: string) => {
    const chatToLoad = chatHistory.find(chat => chat.id === chatId);
    if (chatToLoad) {
      setMessages(chatToLoad.messages);
      setSessionId(chatToLoad.sessionId);
      setAnalysisComplete(!!chatToLoad.sessionId);
      setIsOpen(false);
    }
  };

  const deleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const handleLogout = () => {
    router.push("/HealthMatesecondLanding");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsImageMinimized(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
    setIsImageMinimized(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadCT = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    
    try {
      const userMessage: Message = {
        id: generateId(),
        text: "Please analyze this MRI scan.",
        sender: 'user',
        timestamp: new Date(),
        image: previewImage || undefined
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      const formData = new FormData();
      formData.append('file', selectedImage);
      
      const processingMessage: Message = {
        id: generateId(),
        text: "Analyzing your MRI scan...",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, processingMessage]);
      
      const response = await fetch(`${apiUrl}/analyze_mri/`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data: CTAnalysisData = await response.json();
      console.log('MRI analysis response:', data);
      
      setCTData(data);
      setSessionId(data.session_id);
      
      setMessages(prev => prev.filter(msg => msg.id !== processingMessage.id));
      
      const initialResultMessage: Message = {
        id: generateId(),
        text: `Analysis Complete!\n\nCondition: ${data.classification}\nConfidence: ${data.confidence.toFixed(1)}%\n\nGetting detailed explanation...`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, initialResultMessage]);
      
      // Get explanation
      const explanationFormData = new FormData();
      explanationFormData.append('classification', data.classification);
      explanationFormData.append('confidence', data.confidence.toString());
      
      const explanationResponse = await fetch(`${apiUrl}/explanation/`, {
        method: 'POST',
        body: explanationFormData
      });
      
      if (!explanationResponse.ok) throw new Error('Explanation API request failed');
      
      const explanationData = await explanationResponse.json();
      console.log('Explanation response:', explanationData);
      
      const finalResultMessage: Message = {
        id: generateId(),
        text: `Analysis Complete!\n\nCondition: ${data.classification}\nConfidence: ${data.confidence.toFixed(1)}%\n\nExplanation:\n${explanationData.explanation}\n\nYou can now ask me questions about this analysis.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.map(msg => 
        msg.id === initialResultMessage.id ? finalResultMessage : msg
      ));
      
      setCTData(prev => prev ? { ...prev, explanation: explanationData.explanation } : prev);
      
      setAnalysisComplete(true);
      
      setSelectedImage(null);
      setPreviewImage(null);
      setIsImageMinimized(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Error uploading MRI scan:', error);
      setMessages(prev => prev.filter(msg => msg.text !== "Analyzing your MRI scan..."));
      
      const errorMessage: Message = {
        id: generateId(),
        text: `Sorry, there was an error analyzing your MRI scan: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    if (!analysisComplete || !sessionId) {
      const promptMessage: Message = {
        id: generateId(),
        text: "Please upload a MRI image first before asking questions. I need to analyze an image to provide meaningful discussion.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, promptMessage]);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userMessage: Message = {
        id: generateId(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);

      const formData = new FormData();
      formData.append('session_id', sessionId || '');
      formData.append('user_question', inputValue);
      
      const response = await fetch(`${apiUrl}/chat/`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      console.log('Chat response:', data);
      
      const botMessage: Message = {
        id: generateId(),
        text: data.assistant_response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setInputValue('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: generateId(),
        text: `Sorry, I couldn't process your message: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAnalysisResults = () => {
    if (!ctData) return null;
    
    const confidencePercent = ctData.confidence.toFixed(1) + '%';
    
    return (
      <div className="bg-gray-800 rounded-lg mt-4 mb-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-blue-400 font-bold">MRI Analysis Results</h3>
          <button
            onClick={toggleAnalysisMinimize}
            className="text-gray-400 hover:text-white transition-colors"
            title={isAnalysisMinimized ? "Expand results" : "Minimize results"}
          >
            {isAnalysisMinimized ? (
              <Maximize2 className="w-5 h-5" />
            ) : (
              <Minimize2 className="w-5 h-5" />
            )}
          </button>
        </div>
        
        {!isAnalysisMinimized && (
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Condition:</span>
              <span className="text-blue-300 font-bold">{ctData.classification}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Confidence:</span>
              <span className="text-green-300 font-bold">{confidencePercent}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${ctData.confidence}%` }}
              ></div>
            </div>
            {ctData.explanation && (
              <div className="mt-2">
                <span className="text-gray-300 font-medium text-sm">Explanation:</span>
                <p className="text-gray-200 text-sm mt-1">{ctData.explanation}</p>
              </div>
            )}
          </div>
        )}
        
        {isAnalysisMinimized && (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">
                Condition: <span className="text-blue-300 font-bold">{ctData.classification}</span>
              </span>
              <span className="text-sm text-green-300 font-bold">{confidencePercent}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const clearChat = () => {
    setMessages([{
      id: generateId(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date()
    }]);
    setCTData(null);
    setSessionId(null);
    setAnalysisComplete(false);
    setSelectedImage(null);
    setPreviewImage(null);
    setIsImageMinimized(false);
    setInputValue('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-2 rounded-full transition-all ${
          isOpen
            ? "left-56 top-6 bg-gray-700/50"
            : "left-6 top-6 bg-indigo-600"
        }`}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <X className="text-white w-5 h-5" />
        ) : (
          <Menu className="text-white w-5 h-5" />
        )}
      </button>

      <div
        className={`fixed h-screen w-72 bg-white/10 backdrop-blur-lg border-r border-gray-700/20 flex flex-col z-40 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex flex-row p-6 gap-2 border-b border-gray-700/10">
          <HeartPulse className="text-indigo-600 w-10 h-10" />
          <h1 className="font-semibold text-lg text-white">Healthmate</h1>
        </div>

        <div className="flex-1 flex flex-col justify-between p-4">
          <div className="space-y-1">
            <button 
              onClick={handleNewChat}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <MessageSquarePlus className="w-5 h-5" />
              <span>New Chat</span>
            </button>

            <div className="mt-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Recent Chats</h3>
              <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                {chatHistory.map(chat => (
                  <div 
                    key={chat.id}
                    onClick={() => loadChat(chat.id)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{chat.title}</p>
                      <p className="text-xs text-gray-400">{formatDate(chat.timestamp)}</p>
                    </div>
                    <button 
                      onClick={(e) => deleteChat(chat.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 p-1"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {chatHistory.length === 0 && (
                  <p className="text-xs text-gray-500 px-2 py-1">No chat history yet</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={toggleSidebar}
        />
      )}

      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 rounded-lg my-4">
        {/* Header */}
        <div className="text-center mb-4 pb-4">
          <h1 className="text-4xl font-bold text-blue-500 mb-2">Healthmate</h1>
          <div className="inline-flex items-center bg-black rounded-full px-3 py-1 border border-green-500">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-green-500">Online</span>
          </div>
        </div>

        {/* Analysis Status */}
        {!analysisComplete && (
          <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <span className="text-yellow-200 text-sm">Please upload a MRI scan image to begin analysis</span>
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 mb-4 overflow-y-auto max-h-[60vh] px-2">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`${
                  message.sender === 'user' 
                    ? 'bg-blue-800 text-white self-end rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                    : 'bg-blue-600 text-white self-start rounded-tr-lg rounded-br-lg rounded-bl-lg'
                } p-3 max-w-[85%] shadow`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.image && (
                  <img 
                    src={message.image} 
                    alt="MRI scan" 
                    className="mt-2 max-h-64 rounded-lg border border-gray-300" 
                  />
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="bg-gray-800 text-white p-3 rounded-lg self-start flex items-center space-x-2">
                <span>Processing</span>
                <span className="flex space-x-1">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse" style={{animationDelay: '0.2s'}}>.</span>
                  <span className="animate-pulse" style={{animationDelay: '0.4s'}}>.</span>
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* MRI Analysis Results */}
        {ctData && renderAnalysisResults()}
        
        {/* Image preview for upload */}
        {previewImage && (
          <div className="relative self-start mb-4 w-full">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-blue-400 font-bold">Ready to analyze MRI scan:</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleImageMinimize}
                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
                    title={isImageMinimized ? "Maximize" : "Minimize"}
                  >
                    {isImageMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={removeImage}
                    className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {!isImageMinimized && (
                <div className="relative mb-3">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-h-64 rounded-lg border border-gray-600"
                  />
                </div>
              )}
              
              {isImageMinimized && (
                <div className="mb-3 p-2 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-400 text-sm">Image ready for analysis (minimized)</p>
                </div>
              )}
              
              <button 
                className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 flex items-center w-full justify-center"
                onClick={handleUploadCT}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Analyzing...</span>
                ) : (
                  <>
                    <HeartPulse className="w-5 h-5 mr-2" />
                    Analyze MRI Scan
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="relative bg-gray-800 text-white rounded-full px-4 py-3 pr-36 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
            type="text"
            placeholder={analysisComplete 
              ? "Ask questions about the MRI analysis..." 
              : "Upload a MRI scan image first to enable chat"
            }
            className="w-[90%] bg-transparent focus:outline-none text-sm text-white placeholder-gray-400"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
          <div className="absolute right-2 bottom-2 flex space-x-3 items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <button 
              className="text-gray-400 hover:text-white w-7 h-7 flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              title="Upload MRI scan"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </button>
            
            <button 
              className={`${
                inputValue.trim() && analysisComplete 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white rounded-full w-8 h-8 flex items-center justify-center`}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !analysisComplete || isLoading}
              title={!analysisComplete ? "Upload and analyze a MRI scan first" : "Send message"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          {!analysisComplete 
            ? "Step 1: Upload a MRI scan image using the upload button above"
            : "Step 2: Ask questions about your MRI analysis results"
          }
        </div>
      </main>
    </div>
  );
}