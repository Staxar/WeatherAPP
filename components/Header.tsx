import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Menu } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";

interface HeaderProps {
  city: string;
}

const Header = ({ city }: HeaderProps) => {
  const [visible, setVisible] = useState(false);

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
        }
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
      <Text style={[styles.text, { padding: 2 }]}>
        <EvilIcons name="location" size={24} /> {city}
      </Text>
      <EvilIcons name="plus" size={24} color="white" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    height: 80,
  },
  text: {
    color: "white",
    fontSize: 24,
  },
});
