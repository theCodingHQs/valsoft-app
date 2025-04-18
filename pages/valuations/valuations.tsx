import apiClient from '@/helpers/api-client';
import { accordionColorTrigger } from '@/hooks';
import { useSearchStore } from '@/store/search';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import {
  Building2,
  Calendar,
  Hash,
  MapPin,
  Phone,
  PhoneCall,
  User,
} from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { useValuations } from './api';

const { width } = Dimensions.get('window');

const Valuations = ({ isAllValuations }: { isAllValuations?: boolean }) => {
  const query = useSearchStore((state) => state.query);
  const { data, isLoading, error } = useValuations(!!isAllValuations);

  const filteredData = (data as any[])?.filter((item: any) => {
    //["applicant_name", "address", "title", "reference_number", "institution_name", "status_desc", "visitor_name"]
    return item.applicant_name.toLowerCase().includes(query.toLowerCase());
  });

  console.log(filteredData);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredData?.map((item: any, index: number) => {
        const { backgroundColor, color } = accordionColorTrigger(
          item.status_code
        );
        return (
          <View key={index} style={{ ...styles.card, borderColor: `#fff` }}>
            <View style={{ ...styles.cardHeader, backgroundColor }}>
              <View style={styles.headerItem}>
                <User size={18} color="#444" />
                <Text
                  style={{
                    ...styles.headerText,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}
                >
                  {item.applicant_name}
                </Text>
              </View>
              <View style={styles.headerItem}>
                <Building2 size={18} color="#444" />
                <Text style={styles.headerText}>{item.institution_name}</Text>
              </View>
              <View style={styles.headerItem}>
                <Hash size={18} color="#444" />
                <Text style={styles.headerTitle}>Reference Number:</Text>
                <Text
                  style={{ ...styles.headerText, fontWeight: 'bold', color }}
                >
                  {item.reference_number}
                </Text>
              </View>
            </View>

            <View
              style={{
                ...styles.cardBody,
                boxShadow: `inset 0 3px 10px ${backgroundColor}`,
                borderColor: backgroundColor,
              }}
            >
              <Section title="Applicant Details">
                <Detail
                  value={item.applicant_phone_number}
                  icon={<Phone color="#444" size={16} />}
                />
                <Detail
                  value={item.address}
                  icon={<MapPin color="#444" size={16} />}
                />
              </Section>

              <Section title="Contact Information">
                <Detail
                  value={item.contact_name}
                  icon={<User color="#444" size={16} />}
                />
                <Detail
                  value={item.contact_phone_number}
                  icon={<Phone color="#444" size={16} />}
                />
                <Detail
                  value={item.contact_alternate_phone_number}
                  icon={<PhoneCall color="#444" size={16} />}
                />
                <Detail
                  title="Status :"
                  value={item.status_desc}
                  detailValueStyle={{ color, fontWeight: 'bold' }}
                />
              </Section>

              <Section title="Branch Contact">
                <Detail
                  value={item.branch_contact_person_name}
                  icon={<User color="#444" size={16} />}
                />
                <Detail
                  value={item.branch_contact_person_phone_number}
                  icon={<Phone color="#444" size={16} />}
                />
                <Detail
                  value={item.branch_contact_person_alternate_phone_number}
                  icon={<PhoneCall color="#444" size={16} />}
                />
              </Section>

              <Section title="Important Dates">
                <Detail
                  title="Initiation Date"
                  value={item.formatted_initiation_date}
                  icon={<Calendar color="#444" size={16} />}
                />
                <Detail
                  title="Expected Completion"
                  value={item.expected_completion_date}
                  icon={<Calendar color="#444" size={16} />}
                />
              </Section>
            </View>

            <View style={{ ...styles.cardFooter, backgroundColor }}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>More</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={{ ...styles.section }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

const Detail = ({
  title,
  value,
  icon,
  detailValueStyle,
}: {
  title?: string;
  value: string;
  icon?: React.ReactNode;
  detailValueStyle?: TextStyle;
}) => {
  return (
    <View style={styles.detailRow}>
      {icon && <View style={styles.icon}>{icon}</View>}
      {title && <Text style={styles.detailLabel}>{title}</Text>}
      <Text style={{ ...styles.detailValue, ...detailValueStyle }}>
        {value || 'NA'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    minWidth: 300,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#00000044',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    padding: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#222',
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#666',
  },
  cardBody: {
    // backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 10,
  },
  section: {
    marginBottom: 5,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  sectionContent: {
    paddingLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailRow: {
    minWidth: 130,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    margin: 2,
    marginLeft: 0,
    marginRight: 5,
    borderRadius: 4,
    flexWrap: 'wrap',
    // backgroundColor: '#fafafa',
    // boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  icon: {
    marginRight: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingRight: 4,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#555',
    marginRight: 4,
  },
  detailValue: {
    color: '#000',
    flexShrink: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    boxShadow: '0 -1px 3px rgba(0,0,0,0.1)',
  },
  actionButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  actionText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Valuations;
