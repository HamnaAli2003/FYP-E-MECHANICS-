import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert,
  TouchableOpacity, StyleSheet,
  Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Corrected path to firebase.js
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleResetPassword = async () => {
    Keyboard.dismiss();

    if (!email) {
      Alert.alert('Input Error', 'Please enter your email.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Check Your Email', 'Password reset instructions have been sent.');
      router.replace('/auth/login');
    } catch (error) {
      console.error(error);
      Alert.alert('Reset Failed', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/auth/login')} style={styles.linkContainer}>
          <Text style={styles.link}>Back to <Text style={styles.signInLink}>Login</Text></Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#F5FCFF',
    justifyContent: 'center', padding: 25,
  },
  title: {
    fontSize: 26, fontWeight: '600',
    color: '#2c3e50', marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50, backgroundColor: '#fff',
    marginBottom: 20, paddingHorizontal: 15,
    borderRadius: 8, borderWidth: 1,
    borderColor: '#dfe6e9', fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15, borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: 'white', textAlign: 'center',
    fontWeight: '600', fontSize: 16,
  },
  linkContainer: { marginTop: 25, alignItems: 'center' },
  link: { color: '#7f8c8d', fontSize: 15 },
  signInLink: { color: '#3498db', fontWeight: '600' },
});

