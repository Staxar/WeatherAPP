import { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

import fakeData from "../assets/data.json";
import Header from "../components/Header";
import WheaterBaseInfo from "../components/WheaterBaseInfo";

interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default function Page() {
  const [data, setData] = useState<WeatherResponse>(fakeData);
  const [cityName, setCityName] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams();
      queryParams.append("units", "metric");
      const response = await fetch(
        `http://172.16.1.144:3000/weather/warsaw?${queryParams}`,
      );
      if (response.ok) {
        const responseData: WeatherResponse = await response.json();
        setData(responseData);
      } else {
        alert("Something went wrong! Check city name and try again.");
      }
    };
    fetchData();
  }, [cityName]);

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
