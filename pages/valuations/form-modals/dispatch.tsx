import { View, Text } from 'react-native';
import React from 'react';
import { Modal } from '@/components/modal';

const DispatchModal = () => {
  return (
    <Modal trigger={'dispatch'}>
      <View>
        <Text>DispatchModal</Text>
      </View>
    </Modal>
  );
};

export default DispatchModal;
