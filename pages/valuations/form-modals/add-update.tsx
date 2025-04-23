import { View, Text } from 'react-native';
import { Modal } from '@/components/modal';
import { Pencil, Plus } from 'lucide-react-native';
import AppForm from './form';

const AddUpdateModal = () => {
  return (
    <Modal triggerIcon={<Pencil size={14} color="#444" />}>
      <AppForm  />
    </Modal>
  );
};

export default AddUpdateModal;
