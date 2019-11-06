import type { Node } from 'react';
import { Text, StyleSheet, ImageBackground, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Item from './item';
import FontAwesome5 from '../../../node_modules/react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  list: {
    margin: 10,
    backgroundColor: '#fafafa',
    paddingHorizontal: 14,
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
  emptyText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#858179',
  },
  itemSeperator: {
    padding: 4,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
  },
  headerItem: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  last: {
    marginRight: 0,
  },
  sortText: {
    marginRight: 10,
    marginTop: 3,
  },
  sort: {
    flex: 1,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
});

export const ActivityFeed = ({
  items,
  clearNotifications,
  cancelNotifications,
  sortNotifications,
  sort,
}): Node => {
  const [expandedItem, setExpandedItem] = useState(null);
  const rowRenderer = ({ item, index }) => (
    <Item
      {...item}
      isExpanded={expandedItem === item.id}
      setExpandedItem={setExpandedItem}
      isFirst={index === 0}
      isLast={index === items.length - 1}
    />
  );
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>No Notifications :(</Text>
    </View>
  );

  const renderItemSeperator = () => <View style={styles.itemSeperator} />;
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={sortNotifications} style={[styles.headerItem, styles.sort]}>
        <Text style={styles.sortText}>Date Sent</Text>
        <FontAwesome5 name={sort === 'desc' ? 'sort-down' : 'sort-up'} size={18} solid />
      </TouchableOpacity>
      <TouchableOpacity onPress={clearNotifications} style={styles.headerItem}>
        <Text style={styles.sortText}>Clear</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelNotifications} style={[styles.headerItem, styles.last]}>
        <Text style={styles.sortText}>Cancel Scheduled</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.list}>
      <FlatList
        data={items}
        ListHeaderComponent={renderHeader}
        scrollsToTop={false}
        onEndReachedThreshold={0.1}
        scrollEventThrottle={400}
        renderItem={rowRenderer}
        keyExtractor={item => item.id}
        numColumns={1}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={renderItemSeperator}
      />
    </View>
  );
};

export default { ActivityFeed };
