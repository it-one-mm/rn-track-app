import React from 'react';
import { StyleSheet, View } from 'react-native';

const Spacer = ({ children }) => {
  return <View style={styles.space}>{children}</View>;
};

export default Spacer;

const styles = StyleSheet.create({
  space: {
    margin: 15,
  },
});
