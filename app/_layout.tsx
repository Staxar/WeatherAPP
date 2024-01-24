import { LinearGradient } from "expo-linear-gradient";
import { Slot } from "expo-router";

export default function HomeLayout() {
  return (
    <LinearGradient
      colors={["#34e5eb", "#3b5998", "#192f6a"]}
      style={{ flex: 1 }}
      start={[0, 0]}
      end={[0, 1]}
    >
      <Slot />
    </LinearGradient>
  );
}
