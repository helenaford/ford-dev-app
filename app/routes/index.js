import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Screens from '../screens';

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Screens.Home,
    },
    Notifications: {
      screen: Screens.Notifications,
    },
  },
  {
    initialRouteName: 'Notifications',
    headerMode: 'none',
    transparentCard: true,
    gestureResponseDistance: 500,
    cardStyle: {
      backgroundColor: '#ffffff',
      opacity: 1,
      shadowColor: 'transparent',
    },
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0,
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
      },
    },
  }
);

// needed if you have authentication
const Switch = createSwitchNavigator(
  {
    App: {
      screen: AppStack,
    },
  },
  {
    initialRouteName: 'App',
    navigationOptions: {
      gesturesEnabled: false,
      cardStyle: { shadowColor: 'transparent' },
      headerStyle: {
        borderBottomWidth: 0,
        shadowOpacity: 0,
        shadowOffset: {
          height: 0,
        },
        shadowRadius: 0,
      },
    },
  }
);

export default createAppContainer(Switch);
