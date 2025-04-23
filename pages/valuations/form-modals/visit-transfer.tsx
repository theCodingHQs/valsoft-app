import { View, Text } from 'react-native';
import React from 'react';
import { Modal } from '@/components/modal';

const VisitTransferModal = () => {
  return (
    <Modal trigger={'visit transfer'}>
      <View>
        <Text>VisitTransferModal</Text>
      </View>
    </Modal>
  );
};

export default VisitTransferModal;
