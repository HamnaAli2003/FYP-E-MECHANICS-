// app/(tabs)/auth/signup.jsx

import React, { useState } from 'react';
import {
  View, Text, TextInput, Alert,
  TouchableOpacity, StyleSheet,
  ActivityIndicator, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUp = async () => {
    Keyboard.dismiss();

    if (!email || !password || !confirmPassword) {
      Alert.alert('Input Error', 'All fields are required.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      Alert.alert('Verify Email', 'Check your inbox to verify your email before logging in.');
      router.replace('/auth/login');
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/auth/login')} style={styles.linkContainer}>
          <Text style={styles.link}>Already have an account? <Text style={styles.signInLink}>Sign In</Text></Text>
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
    fontSize: 28, fontWeight: '600',
    color: '#2c3e50', marginBottom: 35,
    textAlign: 'center',
  },
  input: {
    height: 50, backgroundColor: '#fff',
    marginBottom: 15, paddingHorizontal: 15,
    borderRadius: 8, borderWidth: 1,
    borderColor: '#dfe6e9', fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15, borderRadius: 8,
    marginTop: 20, elevation: 2,
  },
  disabledButton: { backgroundColor: '#bdc3c7' },
  buttonText: {
    color: 'white', textAlign: 'center',
    fontWeight: '600', fontSize: 16,
  },
  linkContainer: { marginTop: 25, alignItems: 'center' },
  link: { color: '#7f8c8d', fontSize: 15 },
  signInLink: { color: '#3498db', fontWeight: '600' },
});




