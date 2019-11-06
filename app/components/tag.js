

import type { Node } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  tag: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#A24DEA',
    marginRight: 10,
    borderRadius: 50,
  },
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
    fontSize: 13,
    color: 'white',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
});

export const Tag = ({ label, style }): Node => (
  <View style={[styles.tag, style]}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

export default { Tag };
