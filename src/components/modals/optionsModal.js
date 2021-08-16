import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';

export default function OptionsModal({modalVisible, setModalVisible}) {
  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <Text>Let there be options!</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({});
