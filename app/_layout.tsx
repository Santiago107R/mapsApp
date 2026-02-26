import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import 'react-native-reanimated';

import { useColorScheme } from '@/presentation/hooks/use-color-scheme';
import PermissionCheckerProvider from '../presentation/providers/PermissionCheckerProvider';

import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <PermissionCheckerProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='loading/index' options={{ animation: 'none' }} />
            <Stack.Screen name='map/index' options={{ animation: 'fade' }} />
            <Stack.Screen name='permissions/index' options={{ animation: 'fade' }} />
          </Stack>
          <StatusBar style="auto" />
        </PermissionCheckerProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}