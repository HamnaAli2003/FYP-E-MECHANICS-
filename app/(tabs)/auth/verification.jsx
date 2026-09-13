// File: app/auth/verify-email.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../../config/firebase';
import { sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function VerifyEmail() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [emailSent, setEmailSent] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        if (u.emailVerified) {
          Alert.alert('Verified!', 'Your email has been verified.');
          router.replace('/(tabs)/home');
        }
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSendVerification = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user);
        setEmailSent(true);
        Alert.alert('Email Sent', 'Check your inbox (or spam folder).');
      } catch (error) {
        console.error('Verification error:', error);
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleRefresh = async () => {
    setChecking(true);
    await user.reload();
    if (user.emailVerified) {
      router.replace('/(tabs)/home');
    } else {
      Alert.alert('Not Verified', 'Your email is still not verified.');
    }
    setChecking(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.text}>
        Please check your email ({user?.email}) for a verification link.
      </Text>

      <Button title="Resend Verification Email" onPress={handleSendVerification} disabled={emailSent} />
      <View style={{ marginTop: 10 }}>
        <Button title="I Verified My Email" onPress={handleRefresh} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Log Out" onPress={handleLogout} color="#e74c3c" />
      </View>

      {checking && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
});
