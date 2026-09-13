import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkPopupStatus = async () => {
      try {
        const popupShown = await AsyncStorage.getItem('popupShown');
        if (popupShown !== 'true') {
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error checking popup status:', error);
      }
    };

    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Allow access to your location.');
          return;
        }
        await Location.getCurrentPositionAsync({});
        console.log('User location retrieved successfully.');
      } catch (error) {
        console.error('Error requesting location:', error);
      }
    };

    checkPopupStatus();
    requestLocationPermission();
  }, []);

  const handleCustomer = async () => {
    await AsyncStorage.setItem('userRole', 'customer');
    router.push('/(tabs)/customer/locationscreen');
  };

  const handleMechanic = async () => {
    await AsyncStorage.setItem('userRole', 'mechanic');
    router.push('/(tabs)/mechanic/servicerequest');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleSignup = () => {
    router.push('/auth/signup');
  };

  const handlePopupLater = async () => {
    try {
      setShowPopup(false);
      await AsyncStorage.setItem('popupShown', 'true');
    } catch (error) {
      console.error('Error saving popup status:', error);
    }
  };

  const handlePopupLogin = () => {
    setShowPopup(false);
    handleLogin();
  };

  useEffect(() => {
    if (showPopup) {
      Alert.alert(
        'Login Now or Later?',
        'Would you like to login now or later?',
        [
          { text: 'Later', onPress: handlePopupLater },
          { text: 'Login', onPress: handlePopupLogin },
        ],
        { cancelable: false }
      );
    }
  }, [showPopup]);

  return (
    <LinearGradient colors={['#dbe9f4', '#f0f4f8']} style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to E-Mechanic</Text>
      <Text style={styles.subtitle}>Your Vehicle's Health in Expert Hands</Text>
      <Text style={styles.slogan}>Fast • Reliable • Nearby • Trusted</Text>

      <TouchableOpacity style={styles.buttonWrapper} onPress={handleCustomer}>
        <LinearGradient colors={['#4e54c8', '#8f94fb']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Customer</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonWrapper} onPress={handleMechanic}>
        <LinearGradient colors={['#0052D4', '#4364F7']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Mechanic</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonWrapper} onPress={handleSignup}>
        <LinearGradient colors={['#283c86', '#45a247']} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#34495e',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
    zIndex: 1,
  },
  loginText: {
    color: '#ecf0f1',
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  slogan: {
    fontSize: 14,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '80%',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HomeScreen;
