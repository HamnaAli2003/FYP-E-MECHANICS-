import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, how can I help you?', sender: 'mechanic' },
    { id: '2', text: 'I need assistance with my car.', sender: 'customer' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim().length === 0) return;

    const newMessage = {
      id: (messages.length + 1).toString(),
      text: inputMessage,
      sender: 'customer',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  const handleVideoCall = () => {
    alert('Starting video call (frontend only)...');
  };

  const handleVoiceCall = () => {
    alert('Starting voice call (frontend only)...');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerStyle: { backgroundColor: '#0A3D62' },
      headerTintColor: '#fff',
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 20, marginRight: 10 }}>
          <TouchableOpacity onPress={handleVideoCall}>
            <Ionicons name="videocam" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVoiceCall}>
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const renderMessage = ({ item }) => {
    const isCustomer = item.sender === 'customer';
    return (
      <View
        style={[
          styles.messageContainer,
          isCustomer ? styles.customerMessage : styles.mechanicMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  customerMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  mechanicMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;

