/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import OtpInputs from 'react-native-otp-inputs';
import { Text, Button, View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { TimeOtp } from '../utils/constants';
import addZero from 'add-zero';
import { truncate } from 'lodash';
import axios from 'axios';
import { Paths, RegisterConfirmStatusResponse } from '../utils/constants';
import { storeData } from '../utils/asyncStorage.util';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FillOTp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: TimeOtp,
      loading: false,
    };
    const { width: ScreenWidth } = Dimensions.get('screen');
    this.otpFieldWith = ScreenWidth / 8;
    this.phoneNumber = props.route.params.phoneNumber;

    this.otpProcess = this.otpProcess.bind(this);
    this.resendOtp = this.resendOtp.bind(this);
    //console.log(getData('test'), 'getData');
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.timer === 0) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  otpProcess = async (text) => {
    console.log(text, 'text');
    if (text.length === 6) {
      // set loading
      this.setState({ loading: true });

      const data = { phoneNumber: this.phoneNumber, otp: text };
      const response = await axios.post(
        `${'http://localhost:8080' /**Config.SERVER_URL */}${Paths.CONFIRM_REGISTER}`,
        data,
      );
      console.log(response, 'response confirm');
      if (
        response.status === 201 &&
        response.data.status === RegisterConfirmStatusResponse.SUCCESSFUL
      ) {
        console.log(response.data.token, 'token');
        storeData('@token', response.data.token);
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        // TODO: display popup
        this.props.navigation.goBack();
      }
    }
  };

  resendOtp = () => {
    return truncate;
  };

  render() {
    return (
      <View style={styles.container} flexDirection="column">
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
              fontSize: 28,
              paddingBottom: 28,
            }}
          >
            Nhập mã otp
          </Text>
          <View flexDirection="row">
            <OtpInputs
              inputContainerStyles={{
                backgroundColor: 'white',
                borderColor: 'green',
                borderWidth: 1.2,
                borderRadius: 5,
                width: this.otpFieldWith,
                height: this.otpFieldWith * 1.4,
                justifyContent: 'center',
                //padding: 10,
              }}
              inputStyles={{ fontSize: 24, textAlign: 'center' }}
              textAlign="center"
              //style={{}}
              autofillFromClipboard={false}
              handleChange={(text) => {
                setTimeout(() => {
                  this.otpProcess(text);
                }, 100);
              }}
              keyboardType="phone-pad"
              numberOfInputs={6}
              autoFocus={true}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button
              title={
                this.state.timer === 0
                  ? 'Gửi lại otp'
                  : `Đã gửi otp (0${Math.floor(this.state.timer / 60)} : ${addZero(
                      this.state.timer % 60,
                    )})`
              }
              onPress={() => {
                if (this.state.timer === 0) {
                  this.resendOtp();
                }
              }}
            />
          </View>
          <View>{this.state.loading ? <ActivityIndicator /> : <></>}</View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#8ecae6',
    paddingLeft: 12,
    paddingRight: 12,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#000000',
  },

  underlineStyleBase: {
    width: 60,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#fb8500',
  },
});

export default FillOTp;
