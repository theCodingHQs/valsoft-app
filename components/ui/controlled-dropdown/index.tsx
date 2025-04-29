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
  const selectedItem = list.find((item) => item[valueField] == value);
  const { colors, roundness } = useTheme();

  const getIsSelected = (item: any) =>
    selectedItem?.[valueField] === item[valueField];

  return (
    <Modal
      modalStyle={{
        width: 300,
        height: Math.min(list.length * 40 + 50, 400),
        backgroundColor: 'white',
      }}
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
          padding: 10,
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
            <View
              style={{
                borderRadius: roundness,
                overflow: 'hidden',
                backgroundColor: getIsSelected(item)
                  ? colors.primary
                  : '#f0f0f0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  // width: '100%',
                  flexGrow: 1,
                  height: '100%',
                  padding: 6,
                  color: getIsSelected(item) ? colors.inversePrimary : '#444',
                }}
              >
                {item[labelField]}
              </Text>
              {selectedItem?.[valueField] === item[valueField] && (
                <Text>
                  <CheckIcon size={18} color="#444" />
                </Text>
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
};

export default DropDownMenu;
