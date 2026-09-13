import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const AvailableServicesScreen = () => {
  const [services] = useState([
    { id: '1', name: 'Engine Tuning' },
    { id: '2', name: 'Oil Change' },
    { id: '3', name: 'Battery Replacement' },
    { id: '4', name: 'Tire Service' },
    { id: '5', name: 'Brake Inspection' },
    { id: '6', name: 'AC Repair' },
    { id: '7', name: 'Suspension Work' },
  ]);

  const renderServiceItem = ({ item }) => (
    <View style={styles.card}>
      <FontAwesome5 name="tools" size={22} color="#1e3799" />
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f4f9',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a3d62',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1e90ff',
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    color: '#2f3640',
  },
});

export default AvailableServicesScreen;
