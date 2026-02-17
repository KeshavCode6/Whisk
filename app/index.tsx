import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import OpeningScene from '@/components/ar-scenes/OpeningScene';
import { Button, Theme } from 'tamagui'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Text } from 'tamagui';
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ alignItems: "center", paddingHorizontal: 40, justifyContent: "center", flexGrow: 1 }}>
      <View style={{ gap: 4 }}>
        <Button
          style={{ width: "100%", justifyContent: "space-between" }}
          onPress={() => router.push('/auth?mode=signin')}
        >
          <Text>I have an account!</Text>
          <EvilIcons name="chevron-right" size={24} color="black" />
        </Button>

        <Button
          style={{ width: "100%", justifyContent: "space-between" }}
          variant="outlined"
          onPress={() => router.push('/auth?mode=signup')}
        >
          <Text>Sign up</Text>
          <EvilIcons name="chevron-right" size={24} color="black" />
        </Button>
      </View>

      {/* <ViroARSceneNavigator
        initialScene={{ scene: OpeningScene }}
        style={styles.container}
      /> */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

