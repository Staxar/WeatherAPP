import { Image, StyleSheet, Text, View } from 'react-native';

type wheather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

interface WheaterBaseInfoProps {
  temp: number;
  weather: wheather;
}
const WheaterBaseInfo = ({ temp, weather }: WheaterBaseInfoProps) => {
  return (
    <>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
        }}
        alt="weather-icon"
        width={160}
        height={160}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.largeText, styles.text]}>{temp}</Text>
        <Text style={[styles.normalText, styles.text, { padding: 8 }]}>°C</Text>
      </View>
      <Text style={[styles.normalText, styles.text, { padding: 4 }]}>{weather.main}</Text>
      <Text style={[styles.smallText, { padding: 4 }]}>{weather.description}</Text>
    </>
  );
};

export default WheaterBaseInfo;

const styles = StyleSheet.create({
  largeText: {
    fontSize: 72,
  },
  normalText: {
    fontSize: 24,
  },
  smallText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '300',
    color: '#c7c3c3',
  },
  text: {
    color: 'white',
  },
});
