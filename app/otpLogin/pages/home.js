/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { storeData } from '../utils/asyncStorage.util';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container} flexDirection="column">
      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: 24,
          paddingBottom: 8,
        }}
      >
        Bạn đã đăng nhập!
      </Text>
      <Button
        title="Đăng xuất"
        onPress={() => {
          storeData('@token', '');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#8ecae6',
    paddingLeft: 12,
    paddingRight: 12,
  },
});

export default HomePage;
