import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import { config } from '@/lib/tamagui-config'

export default function RootLayout() {
  return (
    <>
      <TamaguiProvider config={config} defaultTheme="light">
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="light" />
      </TamaguiProvider>
    </>
  );
}
