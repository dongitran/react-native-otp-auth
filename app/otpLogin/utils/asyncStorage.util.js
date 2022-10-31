import AsyncStorage from '@react-native-async-storage/async-storage';
// add sentry

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    // send sentry to capture error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
    }
    return value;
  } catch (e) {
    // error reading value
    // send sentry to capture error
    return null;
  }
};
