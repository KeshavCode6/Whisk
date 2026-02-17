import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import {config} from '@/constants/tamagui-config' 

export default function RootLayout() {
  return (
    <>
        <TamaguiProvider config={config} defaultTheme="light">

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="light" />
          </TamaguiProvider>

    </>
  );
}
