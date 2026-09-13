import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#4e54c8' },
        headerTintColor: '#ffffff',
        contentStyle: { backgroundColor: '#F0F3F6' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Add these auth screens */}
      <Stack.Screen 
        name="auth/login" 
        options={{ 
          title: 'Login',
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="auth/signup"
        options={{
          title: 'Sign Up',
          presentation: 'modal'
        }}
      />
    </Stack>
  );
}