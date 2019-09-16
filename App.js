/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import firebase from 'react-native-firebase';
import { useScreens } from 'react-native-screens';
import Router from './app/routes';

useScreens();

console.disableYellowBox = true; // disable yellow box for tutorial purposes

type Props = {};

class App extends Component<Props> {
  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  createNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log('notification', notification);
        firebase.notifications().displayNotification(notification);
      });

    // optional -> subscribe device to topic
    firebase.messaging().subscribeToTopic('main-topic');
  };

  removeNotificationListeners = () => {
    console.log(
      'this.onUnsubscribeNotificaitonListener',
      this.onUnsubscribeNotificaitonListener,
    );
    this.onUnsubscribeNotificaitonListener();
  };

  componentDidMount() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'Test Channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.removeNotificationListeners();
  }

  //...
  render() {
    return (
      <Fragment>
        <View style={{ backgroundColor: '#F42566', height: 44 }}>
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor={'#F42566'}
          />
        </View>
        <Router
          onNavigationStateChange={this.navigationLogger}
          ref={this.setNavigatiorRef}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
});

export default App;
