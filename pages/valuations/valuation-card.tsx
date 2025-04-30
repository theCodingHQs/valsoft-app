import { accordionColorTrigger, usePhoneDialer } from '@/hooks';
import {
  Building2,
  Calendar,
  Hash,
  MapPin,
  Phone,
  PhoneCall,
  User,
} from 'lucide-react-native';
import { Pressable, Text, TextStyle, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useValuationById } from './api-queries/valuation';
import { ValuationIndex } from './models';
import { ValuationActions } from './valuation-actions';
import { valuationStyles } from './valuations';

const ValuationCard = ({
  valuation: valuationInfo,
}: {
  valuation: ValuationIndex;
}) => {
  const { data: valuation } = useValuationById(valuationInfo.id);

  const { backgroundColor, color } = accordionColorTrigger(
    valuationInfo.status_code
  );
  return (
    <View style={{ ...valuationStyles.card, borderColor: `#fff` }}>
      <View style={{ ...valuationStyles.cardHeader, backgroundColor }}>
        <View style={valuationStyles.headerItem}>
          <User size={18} color="#444" />
          <Text
            style={{
              ...valuationStyles.headerText,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            {valuation?.applicant_name}
          </Text>
        </View>
        <View style={valuationStyles.headerItem}>
          <Building2 size={18} color="#444" />
          <Text style={valuationStyles.headerText}>
            {valuation?.institution_name}
          </Text>
        </View>
        <View style={valuationStyles.headerItem}>
          <Hash size={18} color="#444" />
          <Text style={valuationStyles.headerTitle}>Reference Number:</Text>
          <Text
            style={{ ...valuationStyles.headerText, fontWeight: 'bold', color }}
          >
            {valuation?.reference_number}
          </Text>
        </View>
      </View>

      <View
        style={{
          ...valuationStyles.cardBody,
          boxShadow: `inset 0 3px 10px ${backgroundColor}`,
          borderColor: backgroundColor,
        }}
      >
        <Section title="Applicant Details">
          <Detail
            value={valuation?.applicant_phone_number}
            isPhoneNumber
            icon={<Phone color="#444" size={16} />}
          />
          <Detail
            value={valuation?.address}
            icon={<MapPin color="#444" size={16} />}
          />
        </Section>

        <Section title="Contact Information">
          <Detail
            value={valuation?.contact_name}
            icon={<User color="#444" size={16} />}
          />
          <Detail
            value={valuation?.contact_phone_number}
            isPhoneNumber
            icon={<Phone color="#444" size={16} />}
          />
          <Detail
            value={valuation?.contact_alternate_phone_number}
            isPhoneNumber
            icon={<PhoneCall color="#444" size={16} />}
          />
          <Detail
            title="Status :"
            value={valuation?.status_desc}
            detailValueStyle={{ color, fontWeight: 'bold' }}
          />
        </Section>

        <Section title="Branch Contact">
          <Detail
            value={valuation?.branch_contact_person_name}
            icon={<User color="#444" size={16} />}
          />
          <Detail
            value={valuation?.branch_contact_person_phone_number}
            isPhoneNumber
            icon={<Phone color="#444" size={16} />}
          />
          <Detail
            value={valuation?.branch_contact_person_alternate_phone_number}
            isPhoneNumber
            icon={<PhoneCall color="#444" size={16} />}
          />
        </Section>

        <Section title="Important Dates">
          <Detail
            title="Initiation Date"
            value={valuation?.formatted_initiation_date}
            icon={<Calendar color="#444" size={16} />}
          />
          <Detail
            title="Expected Completion"
            value={valuation?.expected_completion_date}
            icon={<Calendar color="#444" size={16} />}
          />
        </Section>
      </View>

      <View style={{ ...valuationStyles.cardFooter, backgroundColor }}>
        <ValuationActions valuation={valuation} />
      </View>
    </View>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={{ ...valuationStyles.section }}>
    <Text style={valuationStyles.sectionTitle}>{title}</Text>
    <View style={valuationStyles.sectionContent}>{children}</View>
  </View>
);

const Detail = ({
  title,
  value,
  icon,
  detailValueStyle,
  isPhoneNumber,
}: {
  title?: string;
  value: string;
  icon?: React.ReactNode;
  detailValueStyle?: TextStyle;
  isPhoneNumber?: boolean;
}) => {
  const { dial } = usePhoneDialer();
  const { colors, roundness } = useTheme();
  return (
    <View
      style={{
        ...valuationStyles.detailRow,
        backgroundColor: isPhoneNumber && value ? '#00000008' : 'none',
      }}
    >
      {icon && <View style={valuationStyles.icon}>{icon}</View>}
      {title && <Text style={valuationStyles.detailLabel}>{title}</Text>}

      {value ? (
        isPhoneNumber ? (
          <Pressable onPress={() => dial(value)} style={{ flex: 1 }}>
            <Text
              style={[
                valuationStyles.detailValue,
                detailValueStyle,
                {
                  color: colors.onPrimary,
                  borderRadius: roundness,
                  textAlign: 'center',
                },
              ]}
            >
              {value}
            </Text>
          </Pressable>
        ) : (
          <Text style={[valuationStyles.detailValue, detailValueStyle]}>
            {value}
          </Text>
        )
      ) : (
        <Text style={[valuationStyles.detailValue, detailValueStyle]}>NA</Text>
      )}
    </View>
  );
};

export default ValuationCard;
