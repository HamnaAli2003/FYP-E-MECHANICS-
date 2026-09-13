import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const savedRole = await AsyncStorage.getItem('userRole');
        setRole(savedRole);
      } catch (error) {
        console.error('Error getting user role:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserRole();
  }, []);

  if (loading) return null;

  if (!role) return <Redirect href="/onboarding" />;

  if (role === 'mechanic') {
    return <Redirect href="/(tabs)/mechanic/servicerequest" />;
  } else {
    return <Redirect href="/(tabs)/customer/locationscreen" />;
  }
}
