import PermissionsCheckerProvider from '@/presentation/providers/PermissionsCheckerProvider';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <PermissionsCheckerProvider>

      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='loading/index' options={{ animation: 'none' }} />
          <Stack.Screen name='map/index' options={{ animation: 'fade' }} />
          <Stack.Screen name='permissions/index' options={{ animation: 'fade' }} />
        </Stack>
      </ThemeProvider>
    </PermissionsCheckerProvider>

  );
}
