import { View, Text } from 'react-native';
import React from 'react';
import { Modal } from '@/components/modal';

const ReportDelayModal = () => {
  return (
    <Modal trigger={'report delay'}>
      <View>
        <Text>Visit</Text>
      </View>
    </Modal>
  );
};

export default ReportDelayModal;
