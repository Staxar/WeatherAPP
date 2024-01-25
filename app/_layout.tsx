import { Slot } from 'expo-router';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
export default function HomeLayout() {
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
}
