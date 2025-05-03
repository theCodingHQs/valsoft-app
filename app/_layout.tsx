import AuthMiddleware from '@/components/auth-middleware';
import storage from '@/helpers/auth';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { currentPathname, setCurrentPathname } from '@/utils/navigation-state';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { router, Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
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

const isWeb = Platform.OS === 'web';

queryClient.getQueryCache().subscribe((event) => {
  if (event?.query?.state?.status === 'error') {
    const error = event.query.state.error as any;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      if (isWeb) {
        if (currentPathname !== '/login') {
          storage.deleteItem('user');
          storage.deleteItem('token');
          router.replace('/login');
        }
      }
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

  const pathname = usePathname();

  useEffect(() => {
    setCurrentPathname(pathname);
  }, [pathname]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* <GluestackUIProvider mode="system"> */}
      <PaperProvider>
        <AuthMiddleware>
          <SafeAreaView style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} />
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
