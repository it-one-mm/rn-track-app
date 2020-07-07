import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Spacer from './Spacer';

const NavLink = ({ text, onNavigate }) => {
  return (
    <TouchableOpacity onPress={onNavigate}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

export default NavLink;

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: 'blue',
  },
});
