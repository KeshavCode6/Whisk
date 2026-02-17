import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ViroARSceneNavigator } from '@reactvision/react-viro';
import OpeningScene from '@/components/ar-scenes/OpeningScene';
import { Button } from 'tamagui'
import { Text } from 'tamagui';
export default function ARHome() {
  return (
    <View style={{alignItems:"center", justifyContent:"center", flexGrow:1}}>
      <Button>Lorem ipsum</Button>
      <Text>123</Text>
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

