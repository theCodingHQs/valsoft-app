import { View, Text } from 'react-native';
import React from 'react';
import { Modal } from '@/components/modal';
import { FileText } from 'lucide-react-native';

const ValuationMessagesModal = () => {
  return (
    <Modal triggerIcon={<FileText size={14} color="#444" />}>
      <View>
        <Text>Visit</Text>
      </View>
    </Modal>
  );
};

export default ValuationMessagesModal;
