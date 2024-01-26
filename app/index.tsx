import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fragment, Suspense, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import uuid from 'react-native-uuid';

import initialData from '../assets/data.json';
import Header from '../components/Header';
import ItemDescription from '../components/ItemDescription';
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
  const [problem, setProblem] = useState<boolean>(false);
  const CITIES_NAMES_STORAGE_KEY = 'cityNames';
  const saveCityNameToCache = async (cityToSave: string) => {
    try {
      if (cityNamesArray.includes(cityToSave)) {
        return;
      }
      const newCityNames = [...cityNamesArray, cityToSave];
      await AsyncStorage.setItem(CITIES_NAMES_STORAGE_KEY, JSON.stringify(newCityNames));
      setCityNamesArray(newCityNames);
    } catch (error) {
      console.error('Error saving city name to cache:', error);
    }
  };

  const readCityNamesFromCache = async () => {
    try {
      const cachedCityNamesJSON = await AsyncStorage.getItem(CITIES_NAMES_STORAGE_KEY);
      if (cachedCityNamesJSON) {
        const cachedCityNames = JSON.parse(cachedCityNamesJSON);
        setCityNamesArray(cachedCityNames);
      }
    } catch (error) {
      console.error('Error reading city names from cache:', error);
    }
  };

  const weatherInfoData = [
    {
      src: ['thermometer', 'water-check'],
      bottomText: [data.main.feels_like.toString(), data.main.humidity.toString()],
      color: ['red', 'blue'],
      topText: ['Feels like', 'Humidity'],
    },
    {
      src: ['car-brake-low-pressure', 'cloud-outline'],
      bottomText: [data.main.pressure.toString(), data.clouds.all.toString()],
      color: ['yellow', '#35a7db'],
      topText: ['Pressure', 'Clouds'],
    },
    {
      src: ['eye-outline', 'wind-turbine'],
      bottomText: [data.visibility.toString(), data.wind.speed.toString()],
      color: ['#611878', '#88e63c'],
      topText: ['Visibility', 'Wind'],
    },
  ];

  const removeCityHandler = async (cityToRemove: string) => {
    const updatedCityNames = cityNamesArray.filter((city) => city !== cityToRemove);
    await AsyncStorage.setItem(CITIES_NAMES_STORAGE_KEY, JSON.stringify(updatedCityNames));
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
    const fetchData = async () => {
      try {
        if (cityName !== '') {
          const queryParams = new URLSearchParams();
          queryParams.append('units', 'metric');

          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/weather/${cityName}?${queryParams}`,
          );

          if (response.ok) {
            setProblem(false);
            await saveCityNameToCache(cityName);
            setPortalVisible(false);
            const responseData: WeatherResponse = await response.json();
            setData(responseData);
          } else {
            setProblem(true);
            alert('Are you sure what you wrote? Please enter the city name again');
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
          source={problem ? require('../assets/apocalypse.jpg') : require('../assets/galaxy.jpg')}
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
            <View>
              <Text style={[styles.bigText, problem && { color: 'red' }]}>{cityName}</Text>
            </View>
            <WheaterBaseInfo temp={Math.round(data.main.temp)} weather={data.weather[0]} />
            <View style={styles.itemOuterContainer}>
              <View style={styles.itemContainer}>
                {weatherInfoData.map((item, index) => (
                  <Fragment key={uuid.v4().toString()}>
                    <ItemDescription
                      key={uuid.v4().toString()}
                      src={item.src}
                      bottomText={item.bottomText}
                      color={item.color}
                      topText={item.topText}
                    />
                    {index < weatherInfoData.length - 1 && <Divider style={styles.divider} />}
                  </Fragment>
                ))}
              </View>
            </View>
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
  divider: {
    width: '100%',
    margin: 10,
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemOuterContainer: {
    marginTop: 20,
    backgroundColor: 'grey',
    opacity: 0.5,
    borderRadius: 8,
    width: '100%',
    height: 200,
    padding: 20,
  },
  bigText: {
    fontSize: 48,
    color: 'white',
  },
});
