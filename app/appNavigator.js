import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useNotificationService } from './hooks';
import Router from './routes';

function AppNavigator() {
  useNotificationService();

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="#F42566" />
      </View>
      <Router />
    </>
  );
}

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  container: {
    backgroundColor: '#F42566',
    height: 44,
  },
});

export default AppNavigator;
