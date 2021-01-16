import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageValues = async () => {
  const location = await AsyncStorage.getItem('@location');
  const userInformation = await AsyncStorage.getItem('@userInfo');
  const userInfo = JSON.parse(userInformation);
  return {
    location: location,
    userInfo: userInfo,
  };
};