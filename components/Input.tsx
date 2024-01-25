import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
interface Errors {
  lengthError: string;
  charactersError: string;
  formatError: string;
  numbersError: string;
}
interface ButtonIcon {
  iconName: string;
  iconColor: string;
}
interface InpuProps {
  changeCityName: (city: string) => void;
}

const Input = ({ changeCityName }: InpuProps) => {
  const [errors, setErrors] = useState<Errors>({
    lengthError: '',
    charactersError: '',
    formatError: '',
    numbersError: '',
  });
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [buttonIcon, setButtonIcon] = useState<ButtonIcon>({
    iconName: 'plus',
    iconColor: 'white',
  });
  const [cityName, setCityName] = useState<string>('');

  const validateCityName = (name: string) => {
    const minLength = 3;
    const maxLength = 30;

    const isValidLength = name.length >= minLength && name.length <= maxLength;
    const isValidCharacters = /^[a-zA-Z\s-]+$/.test(name);
    const isValidFormat = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(name);
    const hasNoNumbers = /\d/.test(name) === false;

    const newErrors = {
      lengthError: isValidLength ? '' : 'The city name should be between 3 and 30 characters long.',
      charactersError: isValidCharacters
        ? ''
        : 'The city name can only contain letters, spaces and dashes.',
      formatError: isValidFormat ? '' : 'The city name should start with a capital letter.',
      numbersError: hasNoNumbers ? '' : 'The city name should not contain numbers.',
    };
    setErrors(newErrors);
    return isValidLength && isValidCharacters && isValidFormat && hasNoNumbers;
  };

  const inputHandler = (text: string) => {
    setCityName(text);
    setButtonIcon({ iconColor: 'white', iconName: 'plus' });
  };

  const handleSubmit = () => {
    const isValidCity = validateCityName(cityName);
    if (isValidCity) {
      changeCityName(cityName);
      setButtonIcon({ iconColor: 'green', iconName: 'check' });
    } else {
      setButtonIcon({ iconColor: 'red', iconName: 'plus' });
    }
  };

  return (
    <>
      <View style={{ flexDirection: 'column' }}>
        <TextInput
          onChangeText={(text: string) => inputHandler(text)}
          style={styles.textInput}
          textColor="white"
          value={cityName}
          error={Object.values(errors).some((error) => !!error)}
          maxLength={30}
          textContentType="addressCity"
          placeholder="Write the name of the city in English"
        />
        {Object.keys(errors).map(
          (key) =>
            errors[key as keyof Errors] && (
              <Text key={key} style={styles.textError}>
                {errors[key as keyof Errors]}
              </Text>
            ),
        )}
      </View>
      <Button
        icon={() => <EvilIcons name={buttonIcon.iconName} size={24} color={buttonIcon.iconColor} />}
        onPress={handleSubmit}
        children={null}
      />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: { width: 200, backgroundColor: 'transparent', color: 'white', fontSize: 16 },
  textError: { color: 'red', fontSize: 10, width: 200 },
});
