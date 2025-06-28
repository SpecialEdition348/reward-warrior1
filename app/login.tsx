// app/login.tsx

// SECTION: Imports
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// SECTION: Component
export default function LoginScreen() {
  // SECTION: State
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');

  // SECTION: Check Login Persistence
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        router.replace('/parent-dashboard'); // 👈 Skip login screen
      }
    };
    checkLoginStatus();
  }, []);

  // SECTION: Handle Login
  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      alert('Please enter your credentials');
      return;
    }

    // ✅ Mock login success
    await AsyncStorage.setItem('isLoggedIn', 'true');
    alert('Login successful (mock)');
   router.replace('/parent-dashboard');
  };

  // SECTION: Layout
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
     <TextInput
  placeholder="Email or Username"
  style={styles.input}
  onChangeText={setEmailOrUsername}
  value={emailOrUsername}
/>

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>⇨ Login</Text>
      </Pressable>
<Pressable onPress={() => router.push('/register')}>
  <Text style={{ textAlign: 'center', marginTop: 12, color: '#333' }}>
    Don't have an account? Create one
  </Text>
</Pressable>
    </View>
  );
}

// SECTION: Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fdfdfd' },
  logo: { width: 150, height: 150, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#f58426',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});


