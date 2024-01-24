import { StyleSheet, Text, View } from "react-native";
export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Main Page</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});
