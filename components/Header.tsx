import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Input from './Input';

interface HeaderProps {
  city: string;
  changeName: (text: string) => void;
}

const Header = ({ city, changeName }: HeaderProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.innerContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} style={{ padding: 4 }}>
            <EvilIcons name="navicon" size={24} color="white" />
          </Button>
        }>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Menu.Item onPress={() => {}} title="Item 3" />
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
  searchbar: { margin: 'auto', width: 200, backgroundColor: 'transparent' },
});
