import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Adjust path if needed
import { WebSocketProvider } from './contexts/WebSocketContext'; // Adjust path if needed

/**
 * A layout component that handles three things:
 * 1. Protects routes: Redirects to a login page if the user is not authenticated.
 * 2. Initializes WebSocketProvider: Establishes the WebSocket connection for authenticated users.
 * 3. Initializes VocabProvider: Manages all vocabulary data, using the WebSocket connection.
 */
export const WebSocketRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  // If authentication is still loading, you might want to show a spinner
  if (isLoading) {
    return <div>Loading user...</div>;
  }

  // If there is no user after loading, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the providers and the nested routes
  return (
    <WebSocketProvider user={user}>
      {/* <VocabProvider> */}
        {/* The Outlet component renders the matched child route component */}
        <Outlet />
      {/* </VocabProvider> */}
    </WebSocketProvider>
  );
};