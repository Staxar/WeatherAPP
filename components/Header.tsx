import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import uuid from 'react-native-uuid';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Input from './Input';
interface HeaderProps {
  city: string;
  changeName: (text: string) => void;
  cityNamesArray: string[];
  openPortal: (value: boolean) => void;
  changeCityCache: (text: string) => void;
}

const Header = ({ city, changeName, cityNamesArray, openPortal, changeCityCache }: HeaderProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const menuItemPressHandler = (cityName: string) => {
    changeCityCache(cityName);
    openPortal(true);
  };

  return (
    <View style={styles.innerContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} style={styles.button}>
            <EvilIcons name="navicon" size={24} color="white" />
          </Button>
        }>
        {cityNamesArray.map((item) => {
          return (
            <Menu.Item
              onPress={() => menuItemPressHandler(item)}
              title={item}
              key={uuid.v4().toString()}
            />
          );
        })}
      </Menu>
      <Input changeCityName={changeName} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    height: 100,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  searchbar: {
    margin: 'auto',
    width: 200,
    backgroundColor: 'transparent',
  },
  button: {
    padding: 4,
  },
});
