/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import {
  OptionButton,
  ActivityFeed,
  NavBar,
  NavBackButton,
} from '../components';
import { fcm } from '../utils';
import { useNotifs } from '../hooks';
import FontAwesome5 from '../../node_modules/react-native-vector-icons/FontAwesome5';

console.disableYellowBox = true; // disable yellow box for tutorial purposes

const INITIAL_NOTIFICATION = {
  type: 'NOTIFICATION',
  hasDelay: false,
  delay: 10,
  sort: 'desc',
};

function Notifications() {
  const [type, setNotificationType] = useState(INITIAL_NOTIFICATION.type);
  const [hasDelay, setHasDelay] = useState(INITIAL_NOTIFICATION.hasDelay);
  const [delay, setDelay] = useState(INITIAL_NOTIFICATION.delay);
  const [sort, setSort] = useState(INITIAL_NOTIFICATION.sort);

  const id = useSelector(state => state.ui.idCounter);
  const dispatch = useDispatch();
  const {
    notifications,
    addNotif,
    resetNotifs,
    sortNotifs,
    updateNotifLog,
  } = useNotifs();

  const sendNotification = () => {
    const newId = id + 1;
    if (hasDelay) {
      const pendingNotif = fcm.scheduleLocalNotification(type, delay, newId);
      addNotif(pendingNotif, { type, hasDelay, delay }, 'PENDING');
      updateNotifLog(pendingNotif, { name: 'scheduleLocalNotification' });
    } else {
      const notif = fcm.displayNotification(type, newId);
      addNotif(notif, { type, hasDelay }, 'RECEIVED');
      updateNotifLog(notif, { name: 'displayNotification' });
    }

    dispatch({
      type: 'UPDATE_NOTIF_ID_COUNTER',
      idCounter: newId,
    });
  };

  const clearNotifications = () => {
    fcm.removeAllDeliveredNotifications();
    resetNotifs();
  };
  const cancelNotifications = () => {
    fcm.cancelAllNotifications();
    resetNotifs();
  };

  const sortNotifications = () => {
    setSort(sort === 'desc' ? 'asc' : 'desc');
    sortNotifs(sort);
  };

  const renderNotificationForm = () => (
    <View style={styles.sectionParent}>
      <View style={styles.sectionContainer}>
        <View style={styles.options}>
          <View style={styles.optionGroup}>
            <Text style={styles.sectionDescription}>Type</Text>
            <OptionButton
              onChange={setNotificationType}
              value="NOTIFICATION"
              label="Notification"
              isActive={type === 'NOTIFICATION'}
            />
            <OptionButton
              onChange={setNotificationType}
              value="DATA"
              label="Data"
              isActive={type === 'DATA'}
            />
            <OptionButton
              onChange={setNotificationType}
              value="BOTH"
              label="Both"
              isActive={type === 'BOTH'}
            />
          </View>
          <View style={styles.optionGroup}>
            <Text style={styles.sectionDescription}>Schedule</Text>
            <OptionButton
              onChange={setHasDelay}
              value={false}
              label="Now"
              isActive={!hasDelay}
            />

            <OptionButton
              onChange={setHasDelay}
              value={true}
              label="Delay"
              isActive={hasDelay}
            />
          </View>
        </View>
        <TouchableOpacity onPress={sendNotification} style={styles.sendButton}>
          <FontAwesome5 name="paper-plane" size={18} solid color="white" />
        </TouchableOpacity>
      </View>
      {hasDelay && (
        <View style={styles.optionGroup}>
          <Text style={styles.sectionDescription}>Delay (seconds)</Text>
          <OptionButton onChange={setDelay} value={5} isActive={delay === 5} />
          <OptionButton
            onChange={setDelay}
            value={10}
            isActive={delay === 10}
          />
          <OptionButton
            onChange={setDelay}
            value={30}
            isActive={delay === 30}
          />
          <OptionButton
            onChange={setDelay}
            value={60}
            isActive={delay === 60}
          />
        </View>
      )}
    </View>
  );

  const renderNotifications = () => (
    <ActivityFeed
      sort={sort}
      items={notifications}
      clearNotifications={clearNotifications}
      cancelNotifications={cancelNotifications}
      sortNotifications={sortNotifications}
    />
  );

  // contentInsetAdjustmentBehavior="automatic"
  return (
    <>
      <SafeAreaView style={styles.parent}>
        <NavBar leftContent={<NavBackButton />} />
        <View style={styles.body}>
          {renderNotificationForm()}
          <ScrollView style={styles.scrollView}>
            {renderNotifications()}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#fafafa',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fafafa',
    flex: 1,
  },
  sectionParent: {
    flexDirection: 'column',
    marginTop: 32,
    paddingHorizontal: 24,
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 2,
    marginTop: 10,
    paddingBottom: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sendButton: {
    borderRadius: 50,
    backgroundColor: '#a573eb',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 40,
    height: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  optionGroup: {
    flexDirection: 'row',
  },
});

export default Notifications;
