import { View, Text } from 'react-native';
import React from 'react';
import { Modal } from '@/components/modal';
import { DoorOpen } from 'lucide-react-native';

const VisitModal = () => {
  return (
    <Modal triggerIcon={<DoorOpen size={14} color="#444" />}>
      <View>
        <Text>Visit</Text>
      </View>
    </Modal>
  );
};

export default VisitModal;
