import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
export default function HomeLayout() {
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
}
