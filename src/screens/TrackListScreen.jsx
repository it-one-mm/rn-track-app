import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ListItem, Text } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      fetchTracks();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TrackDetail', {
                  _id: item._id,
                  name: item.name,
                })
              }
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default TrackListScreen;

const styles = StyleSheet.create({});
