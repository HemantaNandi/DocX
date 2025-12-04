import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Page } from 'react-pdf';

const Thumbnail = ({ pageNumber, scale, onThumbnailClick }) => {
  return (
    <TouchableOpacity onPress={() => onThumbnailClick(pageNumber)}>
      <View style={styles.thumbnail}>
        <Page pageNumber={pageNumber} scale={scale} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Thumbnail;