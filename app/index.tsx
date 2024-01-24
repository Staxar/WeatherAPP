import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Card from "../components/Card";
export default function Page() {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImageBackground
        source={require("../assets/galaxy.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.innerContainer}>
          <Text style={{ color: "white" }}>Main Page</Text>
          <Card>
            <Text style={{ color: "white" }}>London</Text>
            <Text>54 °C</Text>
            <Image
              source={{ uri: "https://openweathermap.org/img/wn/10d@2x.png" }}
              alt="weather-icon"
              width={50}
              height={50}
            />
            <Text>Heave Rain</Text>
            <Text>Hourly</Text>
          </Card>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    margin: 50,
  },
  backgroundImage: {
    flex: 1,
  },
});
