import { useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

import fakeData from "../assets/data.json";
import Header from "../components/Header";
import WheaterBaseInfo from "../components/WheaterBaseInfo";

export default function Page() {
  const [data, setData] = useState(fakeData);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImageBackground
        source={require("../assets/galaxy.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Header city={data.name} />
        <View style={styles.innerContainer}>
          <WheaterBaseInfo
            temp={Math.round(data.main.temp)}
            weather={data.weather[0]}
          />
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
    margin: 20,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
  },
  largeText: {
    fontSize: 48,
  },
  text: {
    color: "white",
  },
});
