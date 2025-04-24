import { Modal } from '@/components/modal';
import { DoorOpen } from 'lucide-react-native';
import { Text, View } from 'react-native';

const VisitModal = () => {
  return (
    <Modal triggerIcon={<DoorOpen size={18} color="#444" />}>
      <View>
        <Text>Visit</Text>
      </View>
    </Modal>
  );
};

export default VisitModal;
