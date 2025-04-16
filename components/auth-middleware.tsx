// components/AuthMiddleware.tsx
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router, useSegments, useRootNavigationState } from 'expo-router';
import { isUserLoggedIn } from '@/helpers/auth';

export default function AuthMiddleware({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Wait for navigation to be ready before checking auth
    if (!navigationState?.key) return;

    const checkAuth = async () => {
      try {
        // Check if the user is logged in
        const loggedIn = await isUserLoggedIn();
        
        // Logic to handle routing
        const inAppGroup = segments[0] === '(app)';
        
        if (!loggedIn && inAppGroup) {
          router.replace('/login');  
        } else if (loggedIn && !inAppGroup && segments[0] !== undefined) {
          router.replace('/(app)/(tabs)');
        }
        
        // Set checking to false after navigation decision
        setIsChecking(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsChecking(false); // Ensure loading spinner stops even on error
      }
    };

    checkAuth();
  }, [segments, navigationState?.key]);

  if (isChecking && navigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}