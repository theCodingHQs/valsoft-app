import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import DatePicker from '@/components/ui/date-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdatePropertyVisitDelay } from '../api-queries/property';
import { Property } from '../models';

const FormSchema = z.object({
  id: z.number(),

  visit_rescheduled_date: z.preprocess((val) => {
    if (val instanceof Date && !isNaN(val.getTime())) {
      // Convert Date to required format
      return format(val, "yyyy-MM-dd'T'HH:mm")
    }
    return val // assume it's already a string
  },
  z.string()
    .nonempty("Reschedule Date and Time required.")
    .refine((val) => {
      const inputDateTime = new Date(val)
      const currentDateTime = new Date()
      return inputDateTime >= currentDateTime
    }, {
      message: "Cannot select a time earlier than the current date and time.",
    })
  ),

  visit_delay_reason: z.string().nonempty({ message: 'Delay Reason Required' }),
})

type FormData = z.infer<typeof FormSchema>;

export default function VisitDelayForm({property}:Readonly<{property:Property}>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...property
    },
  });
  const {mutate:onSubmitPropertyDelay} = useUpdatePropertyVisitDelay()

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    onSubmitPropertyDelay(data)
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <View>
              <Controller
                control={control}
                name="visit_rescheduled_date"
                render={({ field: { onChange, value } }) => (
                  <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ marginBottom: 6, marginTop: 6 }}>Reschedule Date</Text>
                    <DatePicker
                      date={new Date()}
                      onChangeOrConfirm={(params) => onChange(params.date!)}
                    />
                    {errors.visit_rescheduled_date && (
                      <Text style={styles.error}>
                        {errors.visit_rescheduled_date.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="visit_delay_reason"
                render={({ field: { onChange, value } }) => (
                  <View style={{ marginBottom: 10, marginTop: 10 }}>
                    <TextInput
                      label="Reason For Delay"
                      value={value}
                      onChangeText={onChange}
                      mode="outlined"
                      multiline
                      numberOfLines={2}
                      style={{ height: 100 , }}
                    />
                    {errors.visit_delay_reason && (
                      <Text style={styles.error}>
                        {errors.visit_delay_reason.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
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
