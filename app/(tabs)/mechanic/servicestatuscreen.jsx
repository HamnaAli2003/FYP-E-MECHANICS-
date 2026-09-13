import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const ServiceStatusScreen = ({ navigation }) => {
  const handleServiceOngoing = () => {
    Alert.alert('Service Ongoing', 'Service is now marked as ongoing.');
  };

  const handleFinishService = () => {
    Alert.alert('Service Finished', 'Service has been successfully completed.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 2.9229,
          longitude: 101.6505,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 2.9229, longitude: 101.6505 }}
          title="Service Location"
          description="Customer Location"
        />
      </MapView>

      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <Image
            source={{ uri: 'https://www.example.com/path/to/your/profile-image.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.detailText}>Vehicle No: WYH1140</Text>
          <Text style={styles.detailText}>Issue: Punctured Tyre</Text>
          <Text style={styles.detailText}>Service Type: Tyre</Text>
          <Text style={styles.detailText}>Car Model: Myvi S.E</Text>
          <Text style={styles.detailText}>Customer: Ali Bakar</Text>
          <Text style={styles.detailText}>Phone: 0123456789</Text>
        </View>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={styles.ongoingButton} onPress={handleServiceOngoing}>
            <Text style={styles.buttonText}>SERVICE ONGOING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishService}>
            <Text style={styles.buttonText}>FINISH SERVICE</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1.6,
  },
  detailsContainer: {
    flex: 1.4,
    backgroundColor: '#1f3b59',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    justifyContent: 'space-between',
  },
  details: {
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  detailText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'center',
  },
  buttonsWrapper: {
    gap: 10,
  },
  ongoingButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  finishButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ServiceStatusScreen;


