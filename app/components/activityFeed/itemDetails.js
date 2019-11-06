import type { Node } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Item from './item';
import FontAwesome5 from '../../../node_modules/react-native-vector-icons/FontAwesome5';
import MaterialIcons from '../../../node_modules/react-native-vector-icons/MaterialIcons';

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
    marginTop: 10,
    flexDirection: 'column',
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
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  timeline: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    marginRight: 10,
  },
  timelineLine: {
    backgroundColor: '#888888',
    width: 1,
    flex: 1,
    paddingBottom: 50,
  },
  timelineIcon: {
    position: 'absolute',
    height: 10,
    width: 10,
    marginTop: 5,
    zIndex: 2,
    color: Colors.dark,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {},
  isFirst: { marginTop: 6 },
  isLast: { paddingBottom: 6, flex: 0 },
  hearing: {
    marginLeft: 10,
  },
  inspect: {
    position: 'absolute',
    right: 10,
    width: 30,
    height: 30,
    zIndex: 10,
  },
  inspectIconWrapper: {
    backgroundColor: '#c5c7c5',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  inspectIcon: {
    color: '#505250',
  },
  extraPadding: {
    paddingBottom: 15,
  },
  log: {
  },
});

const renderItem = (item, isFirst, isLast) => (
  <View style={styles.item}>
    <View style={styles.timeline}>
      <View style={styles.timelineIcon}>
        <FontAwesome5 name="circle" size={10} solid />
      </View>
      <View style={[styles.timelineLine, isFirst && styles.isFirst, isLast && styles.isLast]} />
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.itemText}>{item.name}</Text>
      {item.isListener && <MaterialIcons name="hearing" size={14} style={styles.hearing} />}
    </View>
  </View>
);

const renderInspect = onInspect => (
  <TouchableOpacity onPress={onInspect} style={styles.inspect}>
    <View style={styles.inspectIconWrapper}>
      <FontAwesome5 name="print" size={18} solid style={styles.inspectIcon} />
    </View>
  </TouchableOpacity>
);

export default ({ onInspect, status, log = [] }): Node => (
  <View style={styles.log}>
    <View style={styles.seperator} />
    <View style={[styles.content, log.length < 2 && styles.extraPadding]}>
      {renderInspect(onInspect)}
      {log.map((item, i) => renderItem(item, i === 0, i === log.length - 1))}
      {log.length === 0 ? (
        <View>
          <Text>
            {status === 'RECEIVED'
              ? 'No Log. Indicates notification was delivered when app was inactive'
              : 'No Log'}
          </Text>
        </View>
      ) : null}
    </View>
  </View>
);
