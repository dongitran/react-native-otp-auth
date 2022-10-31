/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Node } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native';
import logo from '../assets/image/logo.png';
import InteractiveTextInput from 'react-native-text-input-interactive';
import { isPhoneNumber } from '../utils/common';
import Config from 'react-native-config';
import axios from 'axios';
import { Paths, RegisterStatusResponse, LoginTokenStatusResponse } from '../utils/constants';
import { storeData, getData } from '../utils/asyncStorage.util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const LoginPage = ({ navigation }) => {
  const [ScreenWidth, SetScreenWidth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [userHasExistError, setUserHasExistError] = useState(false);

  useEffect(() => {
    const { width } = Dimensions.get('screen');
    SetScreenWidth(width);
    setPhoneNumber('');
    setPhoneNumberError(false);
    async function checkToken() {
      const token = await getData('@token');

      // Check token
      if (!token || token.length === 0) {
        SplashScreen.hide();
        return;
      }

      const response = await verifyToken(token);
      SplashScreen.hide();
      if (!response?.data?.status || response.data.status !== LoginTokenStatusResponse.SUCCESSFUL) {
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    }
    checkToken();
  }, []);
  const sendOtpProcess = async () => {
    console.log('Send OTP', phoneNumber);
    console.log(Config.SERVER_URL);
    // TODO: check phone number and display popup
    if (!isPhoneNumber(phoneNumber)) {
      setPhoneNumberError(true);
      console.log('Phone number is not valid');
      return;
    }
    // Reset phone number error
    setPhoneNumberError(false);

    // Redirect to fill otp page
    navigation.navigate('FillOtp', { phoneNumber });

    // Request to server for send otp
    const data = { phoneNumber: phoneNumber };
    try {
      const response = await axios.post(
        `${
          'https://0e7c-2405-4802-9047-9050-810-3d78-facc-51e4.ap.ngrok.io' /**Config.SERVER_URL */
        }${Paths.REGISTER}`,
        data,
      );
      if (response.data.status === RegisterStatusResponse.PHONE_NUMBER_ALREADY_EXISTS) {
        setUserHasExistError(true);
        return;
      }
    } catch (error) {
      console.log(JSON.stringify(error), 'Send otp error');
    }
    console.log('response');
  };
  const verifyToken = async (token) => {
    console.log('verifyToken');
    // Request to server for send otp
    const data = { token };
    try {
      const response = await axios.post(
        `${
          'https://0e7c-2405-4802-9047-9050-810-3d78-facc-51e4.ap.ngrok.io' /**Config.SERVER_URL */
        }${Paths.LOGIN_TOKEN}`,
        data,
      );
      return response;
    } catch (error) {
      console.log(JSON.stringify(error), 'Verify token error');
    }
    console.log('response');
  };
  return (
    <View style={styles.container} flexDirection="column">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <View style={{ paddingTop: 50 }}>
          <Image source={logo} style={{ resizeMode: 'contain', width: 200 }} />
        </View>
      </View>
      <View style={{ flex: 2, width: '100%' }}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 24,
            paddingBottom: 8,
          }}
        >
          Wellcome!
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18,
            paddingBottom: 6,
          }}
        >
          Nhập số điện thoại
        </Text>
        <View
          style={{
            marginTop: 18,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ marginRight: 14 }}>
            <InteractiveTextInput
              placeholder="Số điện thoại"
              enableIcon
              textInputStyle={{ width: ScreenWidth * 0.7 }}
              onIconPress={() => {}}
              onChangeText={(text) => {
                setUserHasExistError(false);
                setPhoneNumberError(false);
                setPhoneNumber(text);
              }}
              defaultValue={phoneNumber}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#2a41cb',
              borderRadius: 8,
            }}
            //onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
            onPress={sendOtpProcess}
          >
            <Image
              source={require('../assets/image/arrow.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>
        </View>
        {phoneNumberError && (
          <View style={{ marginLeft: 5, marginTop: 8 }}>
            <Text style={{ color: '#ff4444' }}>Số điện thoại không hợp lệ!</Text>
          </View>
        )}
        {userHasExistError && (
          <View style={{ marginLeft: 5, marginTop: 8 }}>
            <Text style={{ color: '#ff4444' }}>Số điện thoại đã tạo tài khoản!</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 4, backgroundColor: 'green' }} />
      <View
        style={{
          position: 'absolute',
          bottom: 25,
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text>Version 0.0.1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#8ecae6',
    paddingLeft: 12,
    paddingRight: 12,
  },
  logo: {
    width: 300,
    height: 400,
  },
  phoneInput: { placeholder: 'useless placeholder', buttonText: 'ad' },
});

export default LoginPage;
