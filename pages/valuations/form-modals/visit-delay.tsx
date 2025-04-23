import { View, Text } from 'react-native';
import React from 'react';
import { Modal } from '@/components/modal';

const VisitDelayModal = () => {
  return (
    <Modal trigger={'visit delay'}>
      <View>
        <Text>VisitDelayModal</Text>
      </View>
    </Modal>
  );
};

export default VisitDelayModal;
