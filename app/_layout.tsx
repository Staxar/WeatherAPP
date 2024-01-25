import { Slot } from 'expo-router';
import React from 'react';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { PaperProvider } from 'react-native-paper';
export default function HomeLayout() {
  return (
    <AutocompleteDropdownContextProvider>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </AutocompleteDropdownContextProvider>
  );
}
