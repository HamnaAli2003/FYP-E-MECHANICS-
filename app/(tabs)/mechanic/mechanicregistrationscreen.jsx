// ...all imports remain unchanged
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const MechanicRegistrationScreen = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [criminalRecordImage, setCriminalRecordImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mechanicData, setMechanicData] = useState({
    name: "Mechanic",
    phone: "03123456789",
    cnic: "35202-1234567-1",
    skills: "Car AC Repair, Engine Work",
    experience: "3 Years",
    city: "Lahore",
  });

  const pickImage = async (setter) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission required to access photos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const handleChange = (key, value) => {
    setMechanicData({ ...mechanicData, [key]: value });
  };

  const toggleEdit = () => {
    if (isEditing) {
      alert("Information saved successfully!");
    }
    setIsEditing(!isEditing);
  };

  const goToServiceHistory = () => {
    router.push('/(tabs)/servicehistory');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          {/* Profile Image Upload */}
          <TouchableOpacity onPress={() => pickImage(setProfileImage)} style={styles.profileImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImageStyle} />
            ) : (
              <FontAwesome name="user" size={50} color="#fff" />
            )}
            <View style={styles.cameraIconContainer}>
              <FontAwesome name="camera" size={18} color="#0A84FF" />
            </View>
          </TouchableOpacity>

          <Text style={styles.email}>mechanic@gmail.com</Text>
          <Text style={styles.role}>MECHANIC</Text>
        </View>

        <View style={styles.bottomSection}>
          <Input label="Name" value={mechanicData.name} onChangeText={(val) => handleChange('name', val)} editable={isEditing} />
          <Input label="Phone" value={mechanicData.phone} onChangeText={(val) => handleChange('phone', val)} editable={isEditing} />
          <Input label="CNIC" value={mechanicData.cnic} onChangeText={(val) => handleChange('cnic', val)} editable={isEditing} />

          {/* Criminal Record Upload Block */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Criminal Record Certificate</Text>
            <TouchableOpacity onPress={() => pickImage(setCriminalRecordImage)} style={styles.criminalUploadBox}>
              {criminalRecordImage ? (
                <Image source={{ uri: criminalRecordImage }} style={styles.criminalImageStyle} />
              ) : (
                <View style={styles.placeholderBox}>
                  <FontAwesome name="file" size={30} color="#999" />
                  <Text style={styles.placeholderText}>Select Image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <Input label="Skills" value={mechanicData.skills} onChangeText={(val) => handleChange('skills', val)} editable={isEditing} />
          <Input label="Experience" value={mechanicData.experience} onChangeText={(val) => handleChange('experience', val)} editable={isEditing} />
          <Input label="City" value={mechanicData.city} onChangeText={(val) => handleChange('city', val)} editable={isEditing} />

          <TouchableOpacity onPress={toggleEdit} style={[styles.button, styles.primaryButton]}>
            <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToServiceHistory} style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>Service History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Input = ({ label, value, onChangeText, editable }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !editable && styles.readOnlyInput]}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  topSection: {
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 8,
  },
  profileImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  criminalUploadBox: {
    width: '100%',
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  criminalImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  placeholderBox: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 5,
    fontSize: 13,
    color: '#666',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0A84FF',
  },
  email: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  role: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  bottomSection: {
    flex: 1,
    padding: 14,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    color: '#0A84FF',
    fontSize: 13,
    marginBottom: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#0A84FF',
    paddingVertical: 4,
    fontSize: 14,
    color: '#333',
  },
  readOnlyInput: {
    color: '#888',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#0A84FF',
  },
  secondaryButton: {
    backgroundColor: '#0055CC',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MechanicRegistrationScreen;
