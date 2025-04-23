import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { z } from 'zod';
import * as SecureStore from 'expo-secure-store';
import apiClient from '@/helpers/api-client';
import { Platform } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const storeItem = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await apiClient.post('sign_in', {
    org_user: { email, password },
  });

  return response;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (res) => {
      const data = res.data;

      await storeItem('token', res.headers['authorization']);
      await storeItem('user', JSON.stringify(data));
      await storeItem(
        'isAutoReference',
        JSON.stringify(data.is_auto_reference)
      );
      router.replace('/valuations');
    },
    onError: (error) => {
      console.error('Login error', error);
    },
  });

  const handleLogin = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
      mutation.mutate({ email, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <ImageBackground
      source={{uri:'https://wallpaper.forfun.com/fetch/21/21af8682a3ad5631e44f7f4ca9500fe8.jpeg'}} // ⬅️ Use your image path here
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
      resizeMode="cover" // or "contain", "stretch", "repeat"
    >
      <View style={styles.container}>

        <Text style={styles.title}>Welcome Back</Text>
        <View style={styles.form}>
          <View>
            <TextInput
              style={{ height: 40 }}
              autoFocus
              inputMode="text"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          </View>
          <View>
            <TextInput
              style={{ height: 40 }}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
          <Button
            mode="elevated"
            style={{ width: 150, alignSelf: 'center', alignItems: 'center' }}
            loading={mutation.isPending}
            onPress={handleLogin}
          >
            {!mutation.isPending && 'Login'}
          </Button>
        </View>
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    // backgroundColor: '#fffb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    gap: 20,
    padding:40,
    backgroundColor: '#fff4',
    borderRadius:5,
      },

  error: {
    color: '#ff4444',
    fontSize: 14,
  },
});
