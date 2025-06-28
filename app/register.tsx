// app/register.tsx
import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View, Text, TextInput, Pressable, Modal, StyleSheet, Image, ScrollView
} from 'react-native';

const parentAvatars = [
  { name: 'avatar1.png', source: require('../assets/avatars/avatar1.png') },
  { name: 'avatar2.png', source: require('../assets/avatars/avatar2.png') },
];
const childAvatars = [
  { name: 'child-avatar1.png', source: require('../assets/avatars/child-avatar1.png') },
];

export default function RegisterScreen() {
  const [accountType, setAccountType] = useState<'parent' | 'child'>('parent');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const avatarOptions = accountType === 'parent' ? parentAvatars : childAvatars;

  const handleRegister = () => {
    if (!username || !password || password !== confirmPassword) {
      alert('Please complete required fields and confirm your password.');
      return;
    }
    alert(`${accountType} account created! (mock)`);
    router.replace('/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <View style={styles.tabRow}>
          <Pressable onPress={() => router.replace('/login')}>
            <Text style={styles.tabItem}>Login</Text>
          </Pressable>
          <Text style={[styles.tabItem, styles.activeTab]}>Register</Text>
        </View>

        <Text style={styles.title}>Create Your Account</Text>

        <View style={styles.toggleRow}>
          <Pressable
            onPress={() => setAccountType('parent')}
            style={[styles.toggleButton, accountType === 'parent' && styles.toggleActive]}
          >
            <Text style={accountType === 'parent' ? styles.toggleTextActive : styles.toggleText}>
              👤 Parent
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setAccountType('child')}
            style={[styles.toggleButton, accountType === 'child' && styles.toggleActive]}
          >
            <Text style={accountType === 'child' ? styles.toggleTextActive : styles.toggleText}>
              🦲 Child
            </Text>
          </Pressable>
        </View>

        <TextInput
          placeholder={accountType === 'child' ? 'Email (optional)' : 'Email'}
          keyboardType="email-address"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
        />

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUsername}
          value={username}
        />

        <TextInput
          placeholder="Display name (optional)"
          style={styles.input}
          onChangeText={setDisplayName}
          value={displayName}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />

        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />

        <Text style={styles.label}>Choose an Avatar:</Text>
        {avatar ? (
          <Image
            source={avatarOptions.find(a => a.name === avatar)?.source}
            style={styles.avatarPreviewImage}
          />
        ) : null}
        <Pressable style={styles.avatarButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.avatarButtonText}>Change Avatar</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>📿 Create Account</Text>
        </Pressable>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select an Avatar</Text>
              <View style={styles.avatarGrid}>
                {avatarOptions.map((a, i) => (
                  <Pressable
                    key={i}
                    onPress={() => {
                      setAvatar(a.name);
                      setModalVisible(false);
                    }}
                  >
                    <Image
                      source={a.source}
                      style={[
                        styles.avatarImage,
                        avatar === a.name && styles.selectedAvatarImage
                      ]}
                    />
                  </Pressable>
                ))}
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#007bff', textAlign: 'center', marginTop: 10 }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { padding: 24, backgroundColor: '#fdfdfd', flex: 1, justifyContent: 'center' },
  logo: { width: 80, height: 80, alignSelf: 'center', marginBottom: 16 },
  tabRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  tabItem: { marginHorizontal: 16, fontSize: 16, color: '#aaa' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#f58426', color: '#000', fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  toggleRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 8
  },
  toggleActive: { borderColor: '#f58426', backgroundColor: '#fff8f2' },
  toggleText: { color: '#666' },
  toggleTextActive: { color: '#f58426', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  label: { fontSize: 16, marginVertical: 8 },
  avatarPreviewImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 40
  },
  avatarButton: {
    backgroundColor: '#f58426',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  avatarButtonText: { color: '#fff', fontSize: 16 },
  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10
  },
  modalTitle: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  avatarImage: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 30
  },
  selectedAvatarImage: {
    borderWidth: 2,
    borderColor: '#007bff'
  }
});
