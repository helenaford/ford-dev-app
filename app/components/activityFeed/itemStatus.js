import type { Node } from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { timeLeftInSeconds } from '../../utils/date';

const statusColor = {
  RECEIVED: '#46d47a',
  PENDING: '#FEDB51',
  UNDELIVERED: '#c9163a',
};

const styles = StyleSheet.create({
  thumb: color => ({
    maxWidth: 4,
    marginBottom: 10,
    marginTop: 0,
    flex: 1,
    backgroundColor: color || 'black',
  }),
});

export default ({ date, status, isSent }): Node => {
  let displayColor = statusColor[status];

  if (status === 'PENDING' && !isSent && timeLeftInSeconds(date) < 0) {
    displayColor = statusColor.UNDELIVERED;
  }

  return <View style={[styles.thumb(displayColor)]} />;
};
