import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { User } from "@/contexts/AuthContext";
import axiosInstance from "@/axiosInstance";

interface WebSocketContextType {
  socket: WebSocket | null;
}

interface WebSocketProviderProps {
  children: ReactNode;
  user: User | null;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children, user }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = async () => {
      // Clean up any existing connection
      if (socketRef.current) {
        socketRef.current.close();
      }

      try {
        // Get WebSocket token from backend
        const response = await axiosInstance.get('/api/get-ws-token/');
        const { token } = response.data;

        if (!token) {
          console.error('No WebSocket token received');
          return;
        }

        const baseUrl = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8000/ws/notifications/';
        // Append token as query parameter
        const websocketUrl = `${baseUrl}?token=${encodeURIComponent(token)}`;
        
        console.log('Attempting WebSocket connection...');
        
        const newSocket = new WebSocket(websocketUrl);
        socketRef.current = newSocket;

        newSocket.onopen = () => {
          console.log("✅ WebSocket connection established.");
          setSocket(newSocket);
          
          // Clear any reconnection attempts
          if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
          }
          
          // Start heartbeat
          heartbeatInterval.current = setInterval(() => {
            if (newSocket.readyState === WebSocket.OPEN) {
              newSocket.send(JSON.stringify({ type: 'ping' }));
            }
          }, 15000);
        };

        newSocket.onclose = (event) => {
          console.log('WebSocket connection closed.', event.code, event.reason);
          
          // Clean up
          if (heartbeatInterval.current) {
            clearInterval(heartbeatInterval.current);
            heartbeatInterval.current = null;
          }
          
          setSocket(null);
          socketRef.current = null;
          
          // Attempt to reconnect if user is still authenticated
          if (user && !reconnectTimeout.current) {
            console.log('Attempting to reconnect in 3 seconds...');
            reconnectTimeout.current = setTimeout(() => {
              reconnectTimeout.current = null;
              connect();
            }, 3000);
          }
        };

        newSocket.onerror = (error) => {
          console.error('❌ WebSocket Error:', error);
        };

      } catch (error) {
        console.error('Failed to get WebSocket token:', error);
      }
    };

    if (user && !socket) {
      // Small delay to ensure auth is fully set up
      const connectionTimeout = setTimeout(connect, 200);
      return () => clearTimeout(connectionTimeout);
    } else if (!user && socket) {
      // User logged out, close connection
      socket.close();
      setSocket(null);
    }

    return () => {
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user]);

  const contextValue: WebSocketContextType = {
    socket,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};