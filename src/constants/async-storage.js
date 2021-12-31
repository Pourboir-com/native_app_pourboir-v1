import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

export const getAsyncStorageValues = async () => {
  const location = await AsyncStorage.getItem('@location');
  const Currency = await AsyncStorage.getItem('@Currency');
  const City = await AsyncStorage.getItem('@City');
  const manager_details = await AsyncStorage.getItem('@manager_details');
  const userInformation = await AsyncStorage.getItem('@userInfo');
  const language = await AsyncStorage.getItem('@lang');
  let lng = language ? language : Localization.locale;
  const explanatory_screen = await AsyncStorage.getItem('@ExplanatoryScreen');
  const userInfo = JSON.parse(userInformation);
  const manager = JSON.parse(manager_details);
  const explain_screens = JSON.parse(explanatory_screen);
  return {
    location: location || JSON.stringify({ lat: 48.864716, log: 2.349014 }),
    userInfo: userInfo,
    Currency: Currency,
    City: JSON.parse(City) || {},
    manager_details: manager || {},
    ExplanatoryScreen: explain_screens || {},
    language: lng,
  };
};
