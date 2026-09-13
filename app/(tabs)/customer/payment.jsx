import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);

  const handleCashPayment = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Confirmed', 'You selected Cash After Service.');
    } catch (error) {
      Alert.alert('Error', 'Failed to confirm payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Order</Text>
        <Text style={styles.serviceCharge}>Service Charge: PKR 1000</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : (
        <TouchableOpacity style={styles.cashButton} onPress={handleCashPayment}>
          <Text style={styles.cashButtonText}>Cash After Service</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F3A93',
  },
  serviceCharge: {
    fontSize: 16,
    color: '#4B6A88',
    marginTop: 5,
  },
  cashButton: {
    backgroundColor: '#4B6A88',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  cashButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
