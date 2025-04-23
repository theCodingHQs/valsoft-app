import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AddUpdateModal from './form-modals/add-update';
import { CheckCircle } from 'lucide-react-native';
import VisitModal from './form-modals/visit';
import VisitDelayModal from './form-modals/visit-delay';
import VisitTransferModal from './form-modals/visit-transfer';
import { Search } from 'lucide-react-native';
import ReportDelayModal from './form-modals/report-delay';
import VisitReportModal from './form-modals/visit-report';
import ValuationMessagesModal from './form-modals/valuation-message';
import DispatchModal from './form-modals/dispatch';
import { ValuationIndex } from './models';

interface ValuationActionsProps {
  valuation: ValuationIndex;
}

export const ValuationActions: React.FC<ValuationActionsProps> = ({
  valuation,
}) => {
  //   const navigate = useNavigate();

  const isSiteEngineer = false;
  //   useMemo(() => {
  //     return isCurrentUserOnlySiteEngineer();
  //   }, []);

  //   const { mutate: draftToReadyForVisit } = useDraftToReadyForVisit({
  //     dependentQueryKey: (data) => {
  //       return ['valuations', `valuations/${data.id}`];
  //     },
  //   });

  //   const handleDraftToReadyForVisit = (id: string) => {
  //     draftToReadyForVisit(id);
  //   };

  //   const { mutate: cancelValuation } = useCancelValuation();

  //   const handleCancelValuation = (id: string) => {
  //     cancelValuation(id);
  //   };

  return (
    <View style={styles.container}>
      {!isSiteEngineer && <AddUpdateModal valuationId={valuation?.id} />}

      {!isSiteEngineer && valuation?.display_ready_to_visit && (
        <Pressable
          style={styles.marginRight}
          //   onPress={() => handleDraftToReadyForVisit(valuation?.id)}
        >
          <CheckCircle size={16} color="#444" />
        </Pressable>
      )}

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

      {!isSiteEngineer &&
        valuation?.ready_for_visit_or_delayed &&
        !valuation?.valuation_cancelled && (
          <VisitTransferModal
            propertyId={valuation?.property_id}
            proposedVisitor={valuation?.proposed_visitor}
          />
        )}

      {!isSiteEngineer &&
        valuation?.visited &&
        !valuation?.valuation_cancelled && (
          <Pressable
            id={`search-${valuation?.id}`}
            onPress={() => {
              //   navigate(`/valuations/${valuation?.id}/nearby_properties`)
            }}
          >
            <Search size={16} color="#444" />
          </Pressable>
        )}

      {valuation?.visit_completed &&
        !valuation?.valuation_cancelled &&
        !valuation?.valuation_completed && (
          <ReportDelayModal valuationId={valuation?.id} />
        )}

      {!isSiteEngineer &&
        valuation?.visit_completed &&
        !valuation?.valuation_cancelled && (
          <VisitReportModal valuationId={valuation?.id} />
        )}

      {!isSiteEngineer && (
        <ValuationMessagesModal valuationId={valuation?.id} />
      )}

      {!isSiteEngineer &&
        valuation?.visit_completed &&
        !valuation?.valuation_cancelled &&
        !valuation?.valuation_completed && (
          <DispatchModal
            valuationId={valuation?.id}
            minDate={valuation?.initiation_date}
          />
        )}

      {/* {!isSiteEngineer && valuation?.cancellable && (
        <View style={styles.marginLeft}>
          <ConfirmDialog
            trigger={
              <CancelButtonSm
                preventDefault={false}
                id={`cancel-${valuation?.id}`}
              />
            }
            title="Cancel Valuation"
            confirmText="Cancel Valuation"
            onConfirmDialog={() => handleCancelValuation(valuation?.id)}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 4,
    paddingHorizontal: 16,
    paddingTop: 4,
    flexWrap: 'wrap',
  },
  marginRight: {
    marginRight: 16,
  },
  marginLeft: {
    marginLeft: 16,
  },
});
