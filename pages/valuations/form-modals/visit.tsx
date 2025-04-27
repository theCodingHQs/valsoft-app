import { Modal } from '@/components/modal';
import { DoorOpen } from 'lucide-react-native';
import VisitForm from '../forms/visit';

interface VisitFormProps {
  propertyId: number;
  propertyVisitId?: number;
}

const VisitModal = ({ propertyId, propertyVisitId }: VisitFormProps) => {
  return (
    <Modal triggerIcon={<DoorOpen size={18} color="#444" />}>
      <VisitForm propertyId={propertyId} propertyVisitId={propertyVisitId} />
    </Modal>
  );
};

export default VisitModal;
