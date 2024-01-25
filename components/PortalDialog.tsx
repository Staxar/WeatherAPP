import { StyleSheet, View } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';

interface PortalDialogProps {
  hideDialog: (value: boolean) => void;
  cityName: string;
  removeCityHandler: (city: string) => void;
  checkCityName: (city: string, value: boolean) => void;
  portalVisible: boolean;
}

const PortalDialog = ({
  hideDialog,
  cityName,
  removeCityHandler,
  checkCityName,
  portalVisible,
}: PortalDialogProps) => {
  const deletePressHandler = (citytoDelete: string) => {
    removeCityHandler(citytoDelete);
  };
  const checkPressHandler = (citytoDelete: string) => {
    checkCityName(citytoDelete, false);
  };

  return (
    <Portal>
      <Dialog visible={portalVisible} onDismiss={() => hideDialog(false)}>
        <Dialog.Icon icon="city" size={30} />
        <Dialog.Title style={styles.title}>What you want to do with {cityName}?</Dialog.Title>
        <View style={styles.dialogContainer}>
          <Dialog.Content>
            <Button
              style={styles.cancelBtn}
              textColor="white"
              onPress={() => deletePressHandler(cityName)}>
              Delete from cache
            </Button>
          </Dialog.Content>
          <Dialog.Content>
            <Button
              style={styles.addBtn}
              textColor="white"
              onPress={() => checkPressHandler(cityName)}>
              Check weather
            </Button>
          </Dialog.Content>
        </View>
      </Dialog>
    </Portal>
  );
};

export default PortalDialog;

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  cancelBtn: { backgroundColor: 'red' },
  addBtn: { backgroundColor: 'green' },
  dialogContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
