import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

const Colors = {
  primary: '#1E3A8A', // Navy blue
  accent: '#3B82F6', // Blue
  lightTeal: '#D1E8E2', // Light teal
  white: '#FFFFFF',
  black: '#000',
  red: 'red',
};

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleRequestService = () => {
    Alert.alert('Service Requested', 'Your request has been submitted.');
    // Optionally navigate: router.push('/(tabs)/customer/service-confirmation')
  };

  const handleOthersPress = () => {
    router.push('./customer/addcustomservice');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('./customer/nearbyworkshops')}
        >
          <Text style={styles.buttonText}>NEARBY WORKSHOP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      {region ? (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
      ) : (
        <Text style={styles.errorText}>{errorMsg || 'Loading map...'}</Text>
      )}

      <View style={styles.footer}>
        <View style={styles.serviceOptions}>
          <TouchableOpacity style={styles.serviceOption}>
            <Text style={styles.optionText}>Battery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceOption}>
            <Text style={styles.optionText}>Tyre</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceOption} onPress={handleOthersPress}>
            <Text style={styles.optionText}>Others</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.requestButton} onPress={handleRequestService}>
          <Text style={styles.requestButtonText}>REQUEST SERVICE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#102C57', // Navy blue
  },
  button: {
    backgroundColor: Colors.lightTeal, // Light teal
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: Colors.white,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.lightTeal, // Light teal
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  map: {
    flex: 1,
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.red,
  },
  footer: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  serviceOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  serviceOption: {
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  optionText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  requestButton: {
    backgroundColor: Colors.accent,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  requestButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default LocationScreen;






