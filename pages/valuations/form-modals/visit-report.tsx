import { View, Text } from 'react-native';
import React from 'react';
import { Modal } from '@/components/modal';

const VisitReportModal = () => {
  return (
    <Modal trigger={'visit report'}>
      <View>
        <Text>VisitReportModal</Text>
      </View>
    </Modal>
  );
};

export default VisitReportModal;
