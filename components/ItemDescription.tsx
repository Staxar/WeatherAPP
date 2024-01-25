import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface ItemDescriptionProps {
  src: string[];
  color: string[];
  topText: string[];
  bottomText: string[];
}
const ItemDescription = ({ bottomText, color, src, topText }: ItemDescriptionProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.itemContainer}>
        <Icon size={30} source={src[0]} color={color[0]} />
        <View style={styles.column}>
          <Text style={styles.text}>{topText[0]}</Text>
          <Text style={styles.text}>{bottomText[0]}</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Icon size={30} source={src[1]} color={color[1]} />
        <View style={styles.column}>
          <Text style={styles.text}>{topText[1]}</Text>
          <Text style={styles.text}>{bottomText[1]}</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemDescription;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '40%',
  },
  text: {
    color: 'white',
  },
  column: {
    flexDirection: 'column',
  },
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
});
