"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type User = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  is_client: boolean;
  is_freelancer: boolean;
  is_verified: boolean;
};

type Message = {
  id: number;
  content: string;
  timestamp: Date;
  senderId: number;
  senderName: string;
  isRead: boolean;
};

type Conversation = {
  id: number;
  participantId: number;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
};

export default function MessagesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }

    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      
      // Mock conversations data
      setConversations([
        {
          id: 1,
          participantId: 2,
          participantName: "Sarah Johnson",
          participantAvatar: "SJ",
          lastMessage: "Thanks for the great work on the project!",
          lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
          unreadCount: 2,
          isOnline: true,
          messages: [
            {
              id: 1,
              content: "Hi! I saw your portfolio and I'm interested in hiring you for a web development project.",
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              senderId: 2,
              senderName: "Sarah Johnson",
              isRead: true
            },
            {
              id: 2,
              content: "Hello Sarah! Thank you for reaching out. I'd be happy to discuss your project. What kind of web application are you looking to build?",
              timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
              senderId: userData.id,
              senderName: userData.first_name || "You",
              isRead: true
            },
            {
              id: 3,
              content: "It's an e-commerce platform for selling handmade crafts. We need both frontend and backend development.",
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
              senderId: 2,
              senderName: "Sarah Johnson",
              isRead: true
            },
            {
              id: 4,
              content: "Perfect! I have extensive experience with e-commerce platforms. I've worked with React, Node.js, and payment integrations. Would you like to schedule a call to discuss the details?",
              timestamp: new Date(Date.now() - 30 * 60 * 1000),
              senderId: userData.id,
              senderName: userData.first_name || "You",
              isRead: true
            },
            {
              id: 5,
              content: "That sounds great! Let's schedule a call for tomorrow at 2 PM EST.",
              timestamp: new Date(Date.now() - 10 * 60 * 1000),
              senderId: 2,
              senderName: "Sarah Johnson",
              isRead: false
            },
            {
              id: 6,
              content: "Thanks for the great work on the project!",
              timestamp: new Date(Date.now() - 5 * 60 * 1000),
              senderId: 2,
              senderName: "Sarah Johnson",
              isRead: false
            }
          ]
        },
        {
          id: 2,
          participantId: 3,
          participantName: "Michael Chen",
          participantAvatar: "MC",
          lastMessage: "When can we start the mobile app project?",
          lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
          unreadCount: 1,
          isOnline: false,
          messages: [
            {
              id: 7,
              content: "Hi! I need a mobile app developer for my startup. Are you available?",
              timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
              senderId: 3,
              senderName: "Michael Chen",
              isRead: true
            },
            {
              id: 8,
              content: "Hi Michael! Yes, I'm available. What kind of mobile app are you looking to build?",
              timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
              senderId: userData.id,
              senderName: userData.first_name || "You",
              isRead: true
            },
            {
              id: 9,
              content: "When can we start the mobile app project?",
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              senderId: 3,
              senderName: "Michael Chen",
              isRead: false
            }
          ]
        },
        {
          id: 3,
          participantId: 4,
          participantName: "Emma Davis",
          participantAvatar: "ED",
          lastMessage: "The website looks amazing! Thank you.",
          lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
          unreadCount: 0,
          isOnline: true,
          messages: [
            {
              id: 10,
              content: "The website looks amazing! Thank you.",
              timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
              senderId: 4,
              senderName: "Emma Davis",
              isRead: true
            }
          ]
        }
      ]);

      // Set first conversation as active by default
      setActiveConversation(1);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation, conversations]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation || !user) return;

    const timestamp = new Date();
    const messageId = Date.now();

    const newMsg: Message = {
      id: messageId,
      content: newMessage,
      timestamp,
      senderId: user.id,
      senderName: user.first_name || "You",
      isRead: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: timestamp
        };
      }
      return conv;
    }));

    setNewMessage("");

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const responseMsg: Message = {
        id: Date.now() + 1,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date(),
        senderId: conversations.find(c => c.id === activeConversation)?.participantId || 0,
        senderName: conversations.find(c => c.id === activeConversation)?.participantName || "User",
        isRead: false
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversation) {
          return {
            ...conv,
            messages: [...conv.messages, responseMsg],
            lastMessage: responseMsg.content,
            lastMessageTime: responseMsg.timestamp,
            unreadCount: conv.unreadCount + 1
          };
        }
        return conv;
      }));
    }, 2000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConv = conversations.find(c => c.id === activeConversation);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar - Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <Link
              href="/dashboard"
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              ← Dashboard
            </Link>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeConversation === conversation.id ? "bg-green-50 border-green-200" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                    {conversation.participantAvatar}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.participantName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <div className="mt-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-green-600 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                      {activeConv.participantAvatar}
                    </div>
                    {activeConv.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{activeConv.participantName}</h2>
                    <p className="text-sm text-gray-500">
                      {activeConv.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeConv.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === user.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === user.id ? "text-green-100" : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-6">
              <div className="flex items-end space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                    rows={1}
                  />
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

