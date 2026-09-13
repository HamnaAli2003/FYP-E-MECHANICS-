import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

const NearbyWorkshopsScreen = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [workshops, setWorkshops] = useState([]);
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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      setWorkshops([
        {
          id: 1,
          name: 'Workshop A',
          latitude: currentLocation.coords.latitude + 0.01,
          longitude: currentLocation.coords.longitude + 0.01,
        },
        {
          id: 2,
          name: 'Workshop B',
          latitude: currentLocation.coords.latitude - 0.01,
          longitude: currentLocation.coords.longitude - 0.01,
        },
        {
          id: 3,
          name: 'Workshop C',
          latitude: currentLocation.coords.latitude + 0.02,
          longitude: currentLocation.coords.longitude - 0.02,
        },
      ]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for workshop..."
          placeholderTextColor="#888"
        />
      </View>

      {/* Map */}
      {region ? (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
        >
          {workshops.map((workshop) => (
            <Marker
              key={workshop.id}
              coordinate={{
                latitude: workshop.latitude,
                longitude: workshop.longitude,
              }}
              title={workshop.name}
              description="Nearby Workshop"
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{errorMsg || 'Loading map...'}</Text>
        </View>
      )}

      {/* No workshop fallback */}
      {workshops.length === 0 && (
        <View style={styles.noWorkshopsView}>
          <Text style={styles.noWorkshopsText}>No nearby workshops found</Text>
        </View>
      )}

      {/* Action Button */}
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerButtonText}>FIND NEARBY WORKSHOP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    padding: 10,
    backgroundColor: '#102C57',
    alignItems: 'flex-start',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#DDE5F4',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#102C57',
    fontWeight: '600',
    fontSize: 16,
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    padding: 12,
  },
  searchInput: {
    height: 42,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F0F4F7',
    color: '#000',
  },
  map: {
    flex: 1,
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
  },
  noWorkshopsView: {
    alignItems: 'center',
    marginTop: 16,
  },
  noWorkshopsText: {
    color: '#607D8B',
    fontSize: 16,
  },
  footerButton: {
    backgroundColor: '#102C57',
    padding: 16,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default NearbyWorkshopsScreen;





