import AuthMiddleware from '@/components/auth-middleware';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import storage from '@/helpers/auth';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

queryClient.getQueryCache().subscribe((event) => {
  console.log(event);

  if (event?.query?.state?.status === 'error') {
    const error = event.query.state.error as any;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      // if (window.location.pathname !== '/login') {
      storage.deleteItem('user');
      router.replace('/login');
      // }
    }
  }
});

export default function RootLayout() {
  useFrameworkReady();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* <GluestackUIProvider mode="system"> */}
      <PaperProvider >
        <AuthMiddleware>
          <SafeAreaView style={styles.container}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)/" options={{ headerShown: false }} />
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="inverted" />
          </SafeAreaView>
        </AuthMiddleware>
      </PaperProvider>
      {/* </GluestackUIProvider> */}
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
