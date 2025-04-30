import { StyleSheet, View } from 'react-native';

import { useOrgUsers } from '@/pages/users/api-queries/user';
import { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { usePropertyById } from '../api-queries/property';
import {
  useAddPropertyVisit,
  usePropertyVisitById,
  usePropertyVisitOptions,
} from '../api-queries/property-visit';
import { Property, PropertyVisit, PropertyVisitOptions } from '../models';
import VisitDetail from './visit/visit-detail';

export default function VisitForm({
  propertyId,
  propertyVisitId,
}: {
  propertyId: number;
  propertyVisitId?: number;
}) {
  const [activeTab, setActiveTab] = useState('visit-details');
  const [addedProperty, setAddedProperty] = useState<PropertyVisit | null>(
    null
  );

  const {
    data: propertyVisit,
    isLoading,
    refetch: propertyVisitRefetch,
  } = usePropertyVisitById(propertyVisitId ?? addedProperty?.id);
  const { data: property } = usePropertyById(propertyId);
  const { data: propertyVisitOptions } = usePropertyVisitOptions();

  const {
    mutate: addPropertyVisit,
    data: addedPropertyVisit,
    isSuccess: isAddSuccess,
  } = useAddPropertyVisit();

  const { data: orgUsers } = useOrgUsers();

  useEffect(() => {
    if (isAddSuccess) {
      setAddedProperty(addedPropertyVisit as PropertyVisit);
      propertyVisitRefetch();
    }
  }, [isAddSuccess, addedPropertyVisit]);

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Button
          mode={activeTab === 'visit-details' ? 'contained' : 'elevated'}
          onPress={() => setActiveTab('visit-details')}
          style={{ padding: 0 }}
        >
          <Text style={{ fontSize: 13 }}>Details</Text>
        </Button>
        <Button
          mode={activeTab === 'visit-occupancy' ? 'contained' : 'elevated'}
          onPress={() => setActiveTab('visit-occupancy')}
          style={{ padding: 0 }}
        >
          <Text style={{ fontSize: 13 }}>Occupancy</Text>
        </Button>
        <Button
          mode={activeTab === 'visit-documents' ? 'contained' : 'elevated'}
          onPress={() => setActiveTab('visit-documents')}
          style={{ padding: 0 }}
        >
          <Text style={{ fontSize: 13 }}>Documents</Text>
        </Button>
      </View>
      {activeTab === 'visit-details' && (
        <VisitDetail
          addPropertyVisit={addPropertyVisit}
          property={property as Property}
          propertyVisit={propertyVisit!}
          orgUsers={orgUsers}
          propertyVisitOptions={propertyVisitOptions as PropertyVisitOptions}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 20,
  },
  form: {
    gap: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
