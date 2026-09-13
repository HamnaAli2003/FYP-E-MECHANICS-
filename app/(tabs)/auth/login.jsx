import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../config/firebase'; // Corrected path
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle for Sign Up and Login
  const navigation = useNavigation();

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleAuthAction = async () => {
    Keyboard.dismiss();

    if (!email || !password) {
      Alert.alert('Input Error', 'Please fill in both fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        // Sign up logic
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Account Created', 'You can now log in with your credentials.');
        setIsSignUp(false); // Switch to login after successful sign-up
      } else {
        // Login logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          await signOut(auth);
          Alert.alert(
            'Email Not Verified',
            'Please verify your email before logging in. Check your inbox for the verification email.',
            [{ text: 'OK', onPress: () => navigation.navigate('VerifyEmail') }]
          );
          return;
        }

        router.replace('/(tabs)/Onboarding'); // Navigate to the main app screen after login
        Alert.alert('Login Successful', 'Welcome back!');
      }
    } catch (error) {
      if (error?.code) {
        handleAuthError(error);
      } else {
        Alert.alert('Unexpected Error', 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    console.error('Auth error:', error);
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert('Invalid Email', 'The email format is incorrect.');
        break;
      case 'auth/wrong-password':
        Alert.alert('Wrong Password', 'The password you entered is incorrect.');
        break;
      case 'auth/user-not-found':
        Alert.alert('Account Not Found', 'No account found with this email.');
        break;
      case 'auth/too-many-requests':
        Alert.alert('Access Blocked', 'Too many failed attempts. Try again later.');
        break;
      case 'auth/invalid-credential':
        Alert.alert('Auth Error', 'Invalid login credentials. Please check your email/password.');
        break;
      default:
        Alert.alert('Login Failed', error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Input Required', 'Please enter your email address first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Reset Email Sent',
        `Password reset instructions sent to ${email}. Check your spam folder if you don't see it.`
      );
    } catch (error) {
      if (error?.code === 'auth/user-not-found') {
        Alert.alert('No Account', 'No account found with this email.');
      } else {
        Alert.alert('Reset Failed', error.message);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>

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
          onSubmitEditing={handleAuthAction}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleAuthAction}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          {!isSignUp && (
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.link}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.link}>
              {isSignUp
                ? 'Already have an account? ' + <Text style={styles.signUpLink}>Sign In</Text>
                : "Don't have an account? " + <Text style={styles.signUpLink}>Sign Up</Text>}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 35,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#ffffff',
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdde1',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  linksContainer: {
    marginTop: 25,
    alignItems: 'center',
    gap: 12,
  },
  link: {
    color: '#2980b9',
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: '700',
    color: '#1e5799',
  },
});