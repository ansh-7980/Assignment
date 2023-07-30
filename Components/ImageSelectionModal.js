// ImageSelectionModal.js
import React from 'react';
import { View, Modal, FlatList, TouchableOpacity, Image, StyleSheet,Text } from 'react-native';

const images = [
  require('../assets/cartoon.png'),
  require('../assets/doraemon.png'),
];

const ImageSelectionModal = ({ visible, onSelectImage, onClose }) => {
  const handleImageSelect = (image) => {
    onSelectImage(image);
    onClose();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImageSelect(item)}>
      <Image source={item} style={styles.imageItem} />
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.imageListContainer}>
        <Text style={styles.text}> Choose the Sprit</Text>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageListContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    top: '10%', 
    left: '5%', 
    right: '5%',
    bottom: '30%',
  },
  imageItem: {
    width: 100,
    height: 100,
    margin: 5,
  },
  text:{
    fontWeight:"bold",
    fontSize:14,
    alignSelf:"center"
  }
});

export default ImageSelectionModal;
