import { Modal } from '@/components/modal';
import { CheckIcon, ChevronDownIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';

interface DropDownMenuProps {
  list: any[];
  label: string;
  value: any;
  valueField?: string;
  labelField?: string;
  onChange: (value: any) => void;
}

const DropDownMenu = ({
  list,
  label,
  value,
  valueField = 'code_value',
  labelField = 'code_desc',
  onChange,
}: DropDownMenuProps) => {
  console.log(value);
  const selectedItem = list.find((item) => item[valueField] == value);
  const { colors, roundness } = useTheme();
  const selectedStyle = {
    backgroundColor: colors.primary,
    color: colors.inversePrimary,
  };
  return (
    <Modal
      modalStyle={{ width: 300, height: 'auto', backgroundColor: 'white' }}
      triggerStyle={{ padding: 0, backgroundColor: 'transparent' }}
      triggerIcon={
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: 227,
            height: 35,
            ...(!selectedItem
              ? {
                  borderWidth: 1,
                  borderColor: colors.outline,
                  borderRadius: roundness,
                  padding: 8,
                }
              : {}),
          }}
        >
          {selectedItem ? (
            <TextInput
              value={selectedItem[labelField]}
              label={label}
              style={{ height: 35 }}
              mode="outlined"
            />
          ) : (
            <>
              <Text style={{ color: colors.onBackground }}>{label}</Text>
              <ChevronDownIcon size={18} color="#444" />
            </>
          )}
        </View>
      }
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {list.map((item) => (
          <Pressable
            key={item[valueField]}
            style={{
              width: '100%',
            }}
            onPress={() => onChange?.(item[valueField])}
          >
            <View>
              <Text
                style={{
                  borderRadius: roundness,
                  padding: 6,
                  color: '#444',
                  backgroundColor: '#f0f0f0',
                  opacity: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  ...(selectedItem?.[valueField] === item[valueField]
                    ? selectedStyle
                    : {}),
                }}
              >
                {<>{item[labelField]}</>}
                {selectedItem?.[valueField] === item[valueField] && (
                  <CheckIcon size={18} color="#444" />
                )}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
};

export default DropDownMenu;
