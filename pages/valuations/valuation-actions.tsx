import { StyleSheet, View } from 'react-native';
import VisitModal from './form-modals/visit';
import VisitDelayModal from './form-modals/visit-delay';
import { ValuationIndex } from './models';

interface ValuationActionsProps {
  valuation: ValuationIndex;
}

export const ValuationActions: React.FC<ValuationActionsProps> = ({
  valuation,
}) => {
 
  return (
    <View style={styles.container}>

    
      {!valuation?.draft && !valuation?.valuation_cancelled && (
        <VisitModal
          propertyId={valuation?.property_id}
          propertyVisitId={valuation?.property_visit_id}
        />
      )}

      {valuation?.ready_for_visit_or_delayed &&
        !valuation?.valuation_cancelled && (
          <VisitDelayModal propertyId={valuation?.property_id} />
        )}

     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 4,
    flexWrap: 'wrap',
  },
});
