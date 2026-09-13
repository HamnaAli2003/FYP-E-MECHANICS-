// tabs/TabsLayout.jsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from './onboarding'; // Onboarding screen as Home
import ServiceHistoryScreen from './servicehistory';
import MechanicServicesScreen from './mechanic/availableservices';
import MechanicRegistrationScreen from './mechanic/mechanicregistrationscreen';
import SupportScreen from './support/chats';
import PaymentScreen from './customer/payment';
import ServiceRequestScreen from './mechanic/servicerequest';
import ServiceStatusScreen from './mechanic/servicestatuscreen';
import LocationScreen from './customer/locationscreen';
import NearbyWorkshopsScreen from './customer/nearbyworkshops';
import AddCustomServiceScreen from './customer/addcustomservice';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#a7c7e7' }, // 🌟 Light Soft Blue
        headerTintColor: '#000', // Dark text on light background
        tabBarActiveTintColor: '#0052D4', 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="locationscreen"
        component={LocationScreen}
        options={{
          title: 'Booking',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'location-sharp' : 'location-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="nearbyworkshops"
        component={NearbyWorkshopsScreen}
        options={{
          title: 'Nearby Workshops',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'build' : 'build-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="addcustomservice"
        component={AddCustomServiceScreen}
        options={{
          title: 'Add Service',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="servicerequest"
        component={ServiceRequestScreen}
        options={{
          title: 'Request',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'construct' : 'construct-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="servicestatus"
        component={ServiceStatusScreen}
        options={{
          title: 'Status',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="mechanic"
        component={MechanicServicesScreen}
        options={{
          title: 'Mechanic',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'hammer' : 'hammer-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="mechanicregistration"
        component={MechanicRegistrationScreen}
        options={{
          title: 'Register',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-add' : 'person-add-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="history"
        component={ServiceHistoryScreen}
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'time' : 'time-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="support"
        component={SupportScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="payment"
        component={PaymentScreen}
        options={{
          title: 'Payment',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'card' : 'card-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
