import type { Node } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { Tag } from '..';
import ItemDetails from './itemDetails';
import ItemDate from './itemDate';
import ItemStatus from './itemStatus';

const styles = {
  background: {
    paddingBottom: 80,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  elevatedBase: {
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * 3,
    marginTop: 10,
    padding: 0,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
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
  title: {
    fontWeight: '900',
    marginBottom: 2,
  },
  item: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  itemInner: {
    flexDirection: 'row',

    backgroundColor: 'white',
  },
  lastCard: {},

  content: {
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  tags: {
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  tagTypes: {
    hasDelay: {
      backgroundColor: '#F42566',
    },
    appState: {
      backgroundColor: '#596FF1',
    },
    local: {
      backgroundColor: '#FEDB51',
    },
    type: {},
  },
  dateWrapper: {
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
  },
};

export default (item): Node => {
  const timer = useRef(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    clearInterval(timer.current);
    if (isSent) timer.current = setInterval(() => setIsSent(false), 5000);
  }, [isSent]);

  const handlePress = () => {
    item.setExpandedItem(!item.isExpanded && item.id);
  };

  const renderTags = () => {
    return (
      <View style={styles.tags}>
        {item.config && item.config.type && (
          <Tag label={item.config.type} style={styles.tagTypes.type} />
        )}
        {item.config && item.config.isLocal && (
          <Tag label="LOCAL" style={styles.tagTypes.local} />
        )}
        {item.config && item.config.isRemote && (
          <Tag label="REMOTE" style={styles.tagTypes.local} />
        )}
        {item.config && (
          <Tag
            label={item.config.hasDelay ? 'Delay' : 'Now'}
            style={styles.tagTypes.hasDelay}
          />
        )}
        {item.details && item.details.appState && (
          <Tag label={item.details.appState} style={styles.tagTypes.appState} />
        )}
      </View>
    );
  };

  const renderNotification = item => (
    <View style={[styles.content]}>
      {item.title && <Text style={styles.title}>{item.title}</Text>}
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
  const renderData = ({ data = {} }) => {
    const keys = Object.keys(data);
    return (
      <View style={[styles.content]}>
        <Text style={styles.title}>{data[`${keys[0]}`]}</Text>
        <Text style={styles.body}>{data[`${keys[1]}`]}</Text>
      </View>
    );
  };

  const onInspect = () => {
    console.log('MyNotifPipeline APP | INSPECT', item);
  };

  return (
    <View
      elevation={3}
      style={[
        styles.elevatedBase,
        item.isFirst ? styles.firstCard : null,
        item.isLast ? styles.lastCard : null,
      ]}
    >
      <View style={styles.item}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.itemInner}>
            <ItemStatus date={item.date} status={item.status} isSent={isSent} />
            <View style={styles.dateWrapper}>
              <ItemDate
                date={(item.config && item.config.scheduledTime) || item.date}
                status={item.status}
                isSent={isSent}
                setIsSent={setIsSent}
              />
            </View>
            {(item.config && item.config.type !== 'DATA') || !item.config
              ? renderNotification(item)
              : renderData(item)}
          </View>
          {renderTags(item)}
        </TouchableOpacity>
        {item.isExpanded && <ItemDetails {...item} onInspect={onInspect} />}
      </View>
    </View>
  );
};
