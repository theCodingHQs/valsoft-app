import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/ui/date-picker';

// 1. Define Zod schema
const FormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  applicant_name: z.string().min(1, 'Applicant name is required'),
  address: z.string().min(1, 'Address is required'),
  area_location: z.string().min(1, 'Area location is required'),
  birthDate: z.date({ required_error: 'Birth date is required' }),
});

// 2. Infer form type
type FormData = z.infer<typeof FormSchema>;

export default function AppForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      applicant_name: '',
      address: '',
      area_location: '',
      birthDate: new Date(),
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <>
              <View>
                <TextInput
                  style={{ height: 35 }}
                  label="Title"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                />
                {errors.title && (
                  <Text style={styles.error}>{errors.title.message}</Text>
                )}
              </View>
            </>
          )}
        />

        <Controller
          control={control}
          name="applicant_name"
          render={({ field: { onChange, value } }) => (
            <>
              <View>
                <TextInput
                  style={{ height: 35 }}
                  label="Applicant Name"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                />
                {errors.applicant_name && (
                  <Text style={styles.error}>
                    {errors.applicant_name.message}
                  </Text>
                )}
              </View>
            </>
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <>
              <View>
                <TextInput
                  style={{ height: 35 }}
                  label="Address"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                />
                {errors.address && (
                  <Text style={styles.error}>{errors.address.message}</Text>
                )}
              </View>
            </>
          )}
        />

        <Controller
          control={control}
          name="area_location"
          render={({ field: { onChange, value } }) => (
            <>
              <View>
                <TextInput
                  style={{ height: 35 }}
                  label="Area Location"
                  value={value}
                  onChangeText={onChange}
                  mode="outlined"
                />
                {errors.area_location && (
                  <Text style={styles.error}>
                    {errors.area_location.message}
                  </Text>
                )}
              </View>
            </>
          )}
        />

        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <>
              <DatePicker
                date={value}
                onChangeOrConfirm={(params) => onChange(params.date!)}
              />
              {errors.birthDate && (
                <Text style={styles.error}>{errors.birthDate.message}</Text>
              )}
            </>
          )}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        Submit
      </Button>
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
