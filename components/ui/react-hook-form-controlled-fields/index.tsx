import { Controller, UseFormReturn } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownMenu from '../controlled-dropdown';

const ControlledErrorMessage = ({
  validation,
  name,
}: {
  validation: UseFormReturn;
  name: string;
}) =>
  validation.formState.errors[name] && (
    <Text style={styles.error}>
      {validation.formState.errors[name].message as string}
    </Text>
  );
export const ControlledDropDownMenu = ({
  validation,
  name,
  list,
  label,
  valueField,
  labelField,
}: {
  name: string;
  validation: UseFormReturn<any, any, any>;
  list: any[];
  label: string;
  valueField?: string;
  labelField?: string;
}) => {
  return (
    <Controller
      control={validation.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <DropDownMenu
            list={list}
            label={label}
            value={value}
            valueField={valueField}
            labelField={labelField}
            onChange={onChange}
          />
          <ControlledErrorMessage validation={validation} name={name} />
        </View>
      )}
    />
  );
};

export const ControlledTextInput = ({
  validation,
  name,
  label,
  multiline,
}: {
  validation: UseFormReturn<any, any, any>;
  name: string;
  label: string;
  multiline?: boolean;
}) => {
  return (
    <Controller
      control={validation.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={{ height: 35 }}
            multiline={multiline}
            numberOfLines={multiline ? 0 : undefined}
          />
          <ControlledErrorMessage validation={validation} name={name} />
        </View>
      )}
    />
  );
};

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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
