import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ServiceRequestScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 2.9229,
    longitude: 101.6505,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, distanceFilter: 10 }
      );
    };

    requestLocationPermission();
  }, []);

  const handleAcceptService = () => {
    Alert.alert('Service Accepted', 'You have accepted the service request.');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        <Marker
          coordinate={location}
          title="Service Location"
          description="Customer Location"
        />
      </MapView>

      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Vehicle Information</Text>

        <View style={styles.details}>
          <Image
            source={{ uri: 'https://www.example.com/path/to/your/image.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.detailText}>Vehicle No: WYH1140</Text>
          <Text style={styles.detailText}>Issue: Punctured Tyre</Text>
          <Text style={styles.detailText}>Service Type: Tyre</Text>
          <Text style={styles.detailText}>Car Model: Myvi S.E</Text>
          <Text style={styles.detailText}>Customer: Ali Bakar</Text>
          <Text style={styles.detailText}>Phone: 0123456789</Text>
        </View>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptService}>
          <Text style={styles.acceptButtonText}>ACCEPT SERVICE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  map: {
    flex: 1.65,
  },
  detailsContainer: {
    flex: 1.35,
    backgroundColor: '#1f3b59',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  details: {
    alignItems: 'center',
    gap: 2,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  detailText: {
    color: '#ecf0f1',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 2,
  },
  acceptButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ServiceRequestScreen;



