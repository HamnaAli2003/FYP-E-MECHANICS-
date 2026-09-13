// app/customer/add-custom-service.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';


const AddCustomService = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleSubmit = async () => {
    if (!description || !vehicle) {
      Alert.alert('Fill all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'custom_service_requests'), {
        description,
        vehicle,
        createdAt: new Date()
      });
      Alert.alert('Success', 'Service request submitted');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Honda Civic"
        value={vehicle}
        onChangeText={setVehicle}
      />

      <Text style={styles.label}>Service Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="e.g., Engine making noise..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button title="Submit Request" onPress={handleSubmit} />
    </View>
  );
};

export default AddCustomService;

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  label: { marginBottom: 8, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  }
});

