import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function OptionButton({ label, value, onChange, isActive }) {
  function onPress() {
    onChange(value);
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.option}>
      <Text style={[styles.sectionDescription, isActive && styles.highlight]}>
        {label || value}
      </Text>
    </TouchableOpacity>
  );
}

export default { OptionButton };

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
  option: {
    marginLeft: 10,
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
});
