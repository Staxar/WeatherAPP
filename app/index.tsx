import AsyncStorage from '@react-native-async-storage/async-storage';
import { Suspense, useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';

import initialData from '../assets/data.json';
import Header from '../components/Header';
import PortalDialog from '../components/PortalDialog';
import WheaterBaseInfo from '../components/WheaterBaseInfo';

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
  const [data, setData] = useState<WeatherResponse>(initialData);
  const [cityName, setCityName] = useState<string>('');
  const [cityNamesArray, setCityNamesArray] = useState<string[]>([]);
  const [portalVisible, setPortalVisible] = useState(false);
  const [cityCache, setCityCache] = useState<string>('');

  const saveCityNameToCache = async (cityToSave: string) => {
    try {
      if (cityNamesArray.includes(cityToSave)) {
        console.log('City name already exist:', cityToSave);
        return;
      }
      const newCityNames = [...cityNamesArray, cityToSave];
      await AsyncStorage.setItem('cityNames', JSON.stringify(newCityNames));
      setCityNamesArray(newCityNames);
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  const readCityNamesFromCache = async () => {
    try {
      const cachedCityNamesJSON = await AsyncStorage.getItem('cityNames');
      if (cachedCityNamesJSON) {
        const cachedCityNames = JSON.parse(cachedCityNamesJSON);
        setCityNamesArray(cachedCityNames);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  const removeCityHandler = async (cityToRemove: string) => {
    const updatedCityNames = cityNamesArray.filter((city) => city !== cityToRemove);
    await AsyncStorage.setItem('cityNames', JSON.stringify(updatedCityNames));
    setCityNamesArray(updatedCityNames);
    setPortalVisible(false);
  };
  const setCityNameHandler = (cityName: string, portalVisible: boolean) => {
    setCityName(cityName);
    setPortalVisible(portalVisible);
  };

  useEffect(() => {
    readCityNamesFromCache();
  }, []);

  useEffect(() => {
    console.log(cityName);
    const fetchData = async () => {
      try {
        if (cityName !== '') {
          const queryParams = new URLSearchParams();
          queryParams.append('units', 'metric');

          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/weather/${cityName}?${queryParams}`,
          );

          if (response.ok) {
            saveCityNameToCache(cityName);
            setPortalVisible(false);
            const responseData: WeatherResponse = await response.json();
            setData(responseData);
          } else {
            alert('Something went wrong! Check city name and try again.');
          }
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again later.');
      }
    };

    fetchData();
  }, [cityName]);

  function Loading() {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      {portalVisible && (
        <PortalDialog
          hideDialog={setPortalVisible}
          cityName={cityCache}
          removeCityHandler={removeCityHandler}
          checkCityName={setCityNameHandler}
          portalVisible={portalVisible}
        />
      )}
      <Suspense fallback={<Loading />}>
        <ImageBackground
          source={require('../assets/galaxy.jpg')}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <Header
            city={cityName}
            changeName={setCityName}
            cityNamesArray={cityNamesArray}
            openPortal={setPortalVisible}
            changeCityCache={setCityCache}
          />
          <View style={styles.innerContainer}>
            <WheaterBaseInfo temp={Math.round(data.main.temp)} weather={data.weather[0]} />
          </View>
        </ImageBackground>
      </Suspense>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    margin: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
  },
  largeText: {
    fontSize: 48,
  },
  text: {
    color: 'white',
  },
});
