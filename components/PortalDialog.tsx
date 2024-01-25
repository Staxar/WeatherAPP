import { StyleSheet, View } from 'react-native';
import { Portal, Dialog, Text, Button } from 'react-native-paper';

interface PortalDialogProps {
  hideDialog: (value: boolean) => void;
  cityName: string;
}

const PortalDialog = ({ hideDialog, cityName }: PortalDialogProps) => {
  return (
    <Portal>
      <Dialog visible onDismiss={() => hideDialog(false)}>
        <Dialog.Icon icon="city" size={30} />
        <Dialog.Title style={styles.title}>What you want to do with {cityName}?</Dialog.Title>
        <View style={styles.dialogContainer}>
          <Dialog.Content>
            <Button style={styles.cancelBtn} textColor="white">
              Delete from cache
            </Button>
          </Dialog.Content>
          <Dialog.Content>
            <Button style={styles.addBtn} textColor="white">
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
