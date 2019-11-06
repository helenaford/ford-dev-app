import type { Node } from 'react';
import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import CountDown from 'react-native-countdown-component';
import { timeLeftInSeconds, displayTime } from '../../utils/date';
import FontAwesome5 from '../../../node_modules/react-native-vector-icons/FontAwesome5';

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
  details: {
    borderTopColor: '#e6e6e6',
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 0,
  },
  content: {
    marginLeft: 25,
    marginTop: 20,
    flexDirection: 'column',
  },
  text: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  timeline: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 0,
    marginRight: 10,
  },
  timelineLine: {
    backgroundColor: 'black',
    width: 2,
    flex: 1,
    paddingBottom: 50,
  },
  timelineIcon: {
    position: 'absolute',
    height: 10,
    width: 10,
  },
  itemContent: {},
  itemText: {},
  sent: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#46d47a',
    borderRadius: 28,
  },
  undelivered: {
    color: '#c9163a',
  },
  container: {
    marginTop: 10,
  },
  date: {
    marginRight: 20,
  },
  undeliveredContainter: {
    marginRight: 20,
  },
});

const countdownStyles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  digitTxtStyle: {
    color: 'black',
    textAlign: 'center',
  },
  digitStyle: {
    backgroundColor: '#D3D3D3',
    borderRadius: 28,
    padding: 0,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLabelStyle: {
    marginVertical: 0,
    fontSize: 0,
    maxHeight: 0,
    padding: 0,
  },
});

export default ({ date, status, isSent, setIsSent }): Node => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const renderUndlivered = () => (
    <View style={styles.undeliveredContainter}>
      <Text style={styles.undelivered}>Retry</Text>
    </View>
  );
  const renderTimePending = () => {
    const timePending = timeLeftInSeconds(date);
    if (timePending > 0) {
      return renderCountdown(timePending);
    }
    return renderUndlivered();
  };

  const renderCountdown = seconds => (
    <CountDown
      until={seconds}
      onFinish={() => {
        if (isMounted.current) return setIsSent(true);
      }}
      size={12}
      style={countdownStyles.container}
      digitTxtStyle={countdownStyles.digitTxtStyle}
      digitStyle={countdownStyles.digitStyle}
      timeLabelStyle={countdownStyles.timeLabelStyle}
      timeToShow={['S']}
      showSeparator={false}
    />
  );
  if (status === 'PENDING') {
    return (
      <View style={styles.container}>
        {isSent ? (
          <View style={styles.sent}>
            <FontAwesome5 name="check" size={12} solid />
          </View>
        ) : (
          renderTimePending()
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.date]}>
      <Text>{displayTime(date)}</Text>
    </View>
  );
};
