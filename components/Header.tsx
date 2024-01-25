import { Suspense, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Button, Menu } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import cityList from '../assets/transformedCitiesList.json';

interface City {
  id: string;
  title: string;
}
interface HeaderProps {
  city: string;
  changeName: (text: string) => void;
}

const Header = ({ city, changeName }: HeaderProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }
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
      <Suspense fallback={<Loading />}>
        <AutocompleteDropdown
          dataSet={cityList as City[]}
          clearOnFocus={false}
          closeOnBlur
          closeOnSubmit={false}
        />
      </Suspense>
      <EvilIcons name="plus" size={24} color="white" />
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
    height: 80,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  searchbar: { margin: 'auto', width: 200, backgroundColor: 'transparent' },
});
