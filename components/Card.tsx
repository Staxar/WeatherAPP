import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <LinearGradient
      colors={["#181b24", "#181b24"]}
      style={styles.linearGradient}
      start={[0, 0]}
      end={[0, 1]}
    >
      <View style={styles.container}>{children}</View>
    </LinearGradient>
  );
};

export default Card;

const styles = StyleSheet.create({
  linearGradient: {
    opacity: 0.6,
    borderWidth: 1,
    borderRadius: 4,
  },
  container: {
    padding: 8,
  },
});
