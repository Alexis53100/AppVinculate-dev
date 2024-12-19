import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';

const TextInputWithImage = ({ imageSource, handleInputText , ...rest }) => {


  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <TextInput {...rest} 
        style={styles.input} 
        onChangeText={(text) => handleInputText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    flex: 1,
  },
});

export default TextInputWithImage;