import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

const ServiceHistoryScreen = () => {
  const [activeTab, setActiveTab] = useState('mechanic');
  const [serviceHistory, setServiceHistory] = useState([]);

  // Simulating data update every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setServiceHistory((prevHistory) => [
        ...prevHistory,
        {
          id: prevHistory.length + 1,  // Ensure this is unique for each service
          service: `Service #${prevHistory.length + 1}`,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mechanic Finder</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mechanic' && styles.activeTab]}
          onPress={() => setActiveTab('mechanic')}
        >
          <Text style={[styles.tabText, activeTab === 'mechanic' && styles.activeTabText]}>
            MECHANIC
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'customer' && styles.activeTab]}
          onPress={() => setActiveTab('customer')}
        >
          <Text style={[styles.tabText, activeTab === 'customer' && styles.activeTabText]}>
            CUSTOMER
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'mechanic' ? (
          <Text style={styles.placeholder}>Mechanic content goes here</Text>
        ) : (
          <View style={{ flex: 1, width: '100%' }}>
            <Text style={styles.subHeader}>Service History</Text>
            <FlatList
              data={serviceHistory}
              keyExtractor={(item) => item.id.toString()}  // Ensure unique id is used
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Text style={styles.serviceText}>{item.service}</Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f4f9',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0a3d62',
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3799',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#dcdde1',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#dcdde1',
  },
  activeTab: {
    backgroundColor: '#1e90ff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8fa6',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    fontSize: 16,
    color: '#718093',
    textAlign: 'center',
    marginTop: 30,
  },
  historyItem: {
    padding: 12,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1e90ff',
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f3640',
  },
  timeText: {
    fontSize: 14,
    color: '#718093',
  },
});

export default ServiceHistoryScreen;



