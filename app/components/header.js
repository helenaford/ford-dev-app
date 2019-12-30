'use strict';

import type { Node } from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  background: {
    paddingBottom: 80,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  logo: {
    opacity: 1,
    overflow: 'visible',
  },
  text: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
});

export const Header = (): Node => (
  <ImageBackground
    accessibilityRole={'image'}
    source={require('../assets/images/header.jpg')}
    style={styles.background}
    imageStyle={styles.logo}
  >
    <Text style={styles.text}>My React Native App</Text>
  </ImageBackground>
);

export default { Header };
