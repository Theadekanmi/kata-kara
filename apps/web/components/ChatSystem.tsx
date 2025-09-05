"use client";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  senderId: number;
  senderName: string;
  receiverId: number;
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
  read: boolean;
}

interface ChatRoom {
  id: string;
  participantIds: number[];
  participants: Array<{
    id: number;
    name: string;
    avatar?: string;
    online: boolean;
  }>;
  lastMessage?: Message;
  unreadCount: number;
  projectId?: number;
  projectTitle?: string;
}

interface ChatSystemProps {
  currentUserId: number;
  currentUserName: string;
  projectId?: number;
  recipientId?: number;
}

export function ChatSystem({ currentUserId, currentUserName, projectId, recipientId }: ChatSystemProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeChat();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [currentUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = async () => {
    try {
      // Fetch existing chat rooms
      await fetchChatRooms();
      
      // Initialize WebSocket connection
      initializeWebSocket();
      
      // If recipientId is provided, create or find chat room
      if (recipientId) {
        const roomId = await findOrCreateChatRoom(recipientId);
        setActiveRoom(roomId);
      }
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatRooms = async () => {
    try {
      const access = localStorage.getItem("access_token");
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
      
      const response = await fetch(`${base}/api/chat/rooms/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        const rooms = await response.json();
        setChatRooms(rooms);
      } else {
        // Mock data for demo
        setChatRooms([
          {
            id: "room_1",
            participantIds: [currentUserId, 2],
            participants: [
              { id: currentUserId, name: currentUserName, online: true },
              { id: 2, name: "Sarah Johnson", online: false }
            ],
            lastMessage: {
              id: "msg_1",
              senderId: 2,
              senderName: "Sarah Johnson",
              receiverId: currentUserId,
              content: "Thanks for the proposal! When can we start?",
              timestamp: new Date(Date.now() - 300000),
              type: 'text',
              read: false
            },
            unreadCount: 1,
            projectId: 1,
            projectTitle: "React Dashboard Development"
          }
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
    }
  };

  const initializeWebSocket = () => {
    try {
      // In production, use wss:// and proper WebSocket endpoint
      const wsUrl = `ws://127.0.0.1:8000/ws/chat/${currentUserId}/`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        setConnected(true);
        console.log("WebSocket connected");
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };

      wsRef.current.onclose = () => {
        setConnected(false);
        console.log("WebSocket disconnected");
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.CLOSED) {
            initializeWebSocket();
          }
        }, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnected(false);
      };
    } catch (error) {
      console.error("Failed to initialize WebSocket:", error);
      setConnected(false);
    }
  };

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case 'message':
        const newMessage: Message = {
          id: data.id,
          senderId: data.sender_id,
          senderName: data.sender_name,
          receiverId: data.receiver_id,
          content: data.content,
          timestamp: new Date(data.timestamp),
          type: data.message_type || 'text',
          fileUrl: data.file_url,
          fileName: data.file_name,
          read: false
        };
        
        if (activeRoom === data.room_id) {
          setMessages(prev => [...prev, newMessage]);
        }
        
        updateChatRoomLastMessage(data.room_id, newMessage);
        break;

      case 'typing':
        if (data.room_id === activeRoom && data.user_id !== currentUserId) {
          setTypingUsers(prev => [...prev.filter(u => u !== data.user_name), data.user_name]);
          
          setTimeout(() => {
            setTypingUsers(prev => prev.filter(u => u !== data.user_name));
          }, 3000);
        }
        break;

      case 'user_status':
        updateUserOnlineStatus(data.user_id, data.online);
        break;
    }
  };

  const findOrCreateChatRoom = async (otherUserId: number): Promise<string> => {
    // Check if room already exists
    const existingRoom = chatRooms.find(room => 
      room.participantIds.includes(otherUserId)
    );
    
    if (existingRoom) {
      return existingRoom.id;
    }

    // Create new room
    try {
      const access = localStorage.getItem("access_token");
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
      
      const response = await fetch(`${base}/api/chat/rooms/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify({
          participant_ids: [currentUserId, otherUserId],
          project_id: projectId
        }),
      });

      if (response.ok) {
        const newRoom = await response.json();
        setChatRooms(prev => [...prev, newRoom]);
        return newRoom.id;
      } else {
        // Mock room creation for demo
        const mockRoom: ChatRoom = {
          id: `room_${Date.now()}`,
          participantIds: [currentUserId, otherUserId],
          participants: [
            { id: currentUserId, name: currentUserName, online: true },
            { id: otherUserId, name: "New Contact", online: false }
          ],
          unreadCount: 0,
          projectId
        };
        setChatRooms(prev => [...prev, mockRoom]);
        return mockRoom.id;
      }
    } catch (error) {
      console.error("Failed to create chat room:", error);
      throw error;
    }
  };

  const loadMessages = async (roomId: string) => {
    try {
      const access = localStorage.getItem("access_token");
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
      
      const response = await fetch(`${base}/api/chat/rooms/${roomId}/messages/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.ok) {
        const messages = await response.json();
        setMessages(messages);
      } else {
        // Mock messages for demo
        const mockMessages: Message[] = [
          {
            id: "1",
            senderId: 2,
            senderName: "Sarah Johnson",
            receiverId: currentUserId,
            content: "Hi! I'm interested in your proposal for the React project.",
            timestamp: new Date(Date.now() - 3600000),
            type: 'text',
            read: true
          },
          {
            id: "2",
            senderId: currentUserId,
            senderName: currentUserName,
            receiverId: 2,
            content: "Great! I'd love to discuss the project details with you.",
            timestamp: new Date(Date.now() - 3500000),
            type: 'text',
            read: true
          }
        ];
        setMessages(mockMessages);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeRoom) return;

    const message = {
      room_id: activeRoom,
      content: newMessage.trim(),
      type: 'text'
    };

    // Send via WebSocket if connected
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        ...message
      }));
    } else {
      // Fallback to HTTP request
      try {
        const access = localStorage.getItem("access_token");
        const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";
        
        await fetch(`${base}/api/chat/messages/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access}`,
          },
          body: JSON.stringify(message),
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }

    // Add message locally for immediate feedback
    const localMessage: Message = {
      id: `temp_${Date.now()}`,
      senderId: currentUserId,
      senderName: currentUserName,
      receiverId: 0, // Will be updated from server
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      read: false
    };

    setMessages(prev => [...prev, localMessage]);
    setNewMessage("");
  };

  const handleTyping = () => {
    if (!activeRoom) return;

    if (!isTyping) {
      setIsTyping(true);
      
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'typing',
          room_id: activeRoom,
          user_id: currentUserId,
          user_name: currentUserName
        }));
      }
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const updateChatRoomLastMessage = (roomId: string, message: Message) => {
    setChatRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            lastMessage: message,
            unreadCount: room.id === activeRoom ? 0 : room.unreadCount + 1
          }
        : room
    ));
  };

  const updateUserOnlineStatus = (userId: number, online: boolean) => {
    setChatRooms(prev => prev.map(room => ({
      ...room,
      participants: room.participants.map(p => 
        p.id === userId ? { ...p, online } : p
      )
    })));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectRoom = (roomId: string) => {
    setActiveRoom(roomId);
    loadMessages(roomId);
    
    // Mark room as read
    setChatRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, unreadCount: 0 } : room
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-96 flex">
      {/* Chat Rooms List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center">
            Messages
            <div className={`ml-2 w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chatRooms.map((room) => {
            const otherParticipant = room.participants.find(p => p.id !== currentUserId);
            
            return (
              <div
                key={room.id}
                onClick={() => selectRoom(room.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeRoom === room.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      otherParticipant?.online ? 'bg-green-400' : 'bg-gray-300'
                    }`}></div>
                    <span className="font-medium text-sm text-gray-900">
                      {otherParticipant?.name || 'Unknown'}
                    </span>
                  </div>
                  {room.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full px-2 py-1">
                      {room.unreadCount}
                    </span>
                  )}
                </div>
                
                {room.projectTitle && (
                  <div className="text-xs text-gray-500 mb-1">{room.projectTitle}</div>
                )}
                
                {room.lastMessage && (
                  <div className="text-xs text-gray-600 truncate">
                    {room.lastMessage.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {activeRoom ? (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === currentUserId
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.senderId === currentUserId ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {typingUsers.length > 0 && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm">
                    {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  📎
                </button>
                
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  // Handle file upload
                  console.log("File selected:", e.target.files?.[0]);
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

