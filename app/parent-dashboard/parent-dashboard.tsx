// app/parent-dashboard/parent-dashboard.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Modal, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AddRewardModal from './AddRewardModal';

export default function ParentDashboard() {
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [rewardModalVisible, setRewardModalVisible] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/login');
  };

  const linkedChildren = [
    { id: 'child1', username: 'Ella' },
    { id: 'child2', username: 'Liam' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f58426' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Custom Header */}
          <View style={styles.header}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <View style={styles.headerButtons}>
              <Pressable style={styles.headerButton} onPress={handleLogout}>
                <Text style={styles.headerButtonText}>Logout</Text>
              </Pressable>
              <Pressable style={styles.headerButton} onPress={() => router.push('/settings')}>
                <Text style={styles.headerButtonText}>Settings</Text>
              </Pressable>
            </View>
          </View>

          {/* Button Section */}
          <View style={styles.buttonSection}>
            <Pressable style={styles.actionButton} onPress={() => setTaskModalVisible(true)}>
              <Ionicons name="add-circle-outline" size={20} color="white" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>Add Task</Text>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={() => setRewardModalVisible(true)}>
              <FontAwesome5 name="gift" size={18} color="white" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>Add Reward</Text>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={() => {}}>
              <FontAwesome5 name="child" size={18} color="white" style={styles.buttonIcon} />
              <Text style={styles.actionButtonText}>Link Child Account</Text>
            </Pressable>
          </View>

          {/* Placeholder Add Task Modal */}
          <Modal visible={taskModalVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Add Task Modal (Placeholder)</Text>
                <Pressable onPress={() => setTaskModalVisible(false)}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Add Reward Modal */}
          <AddRewardModal
            visible={rewardModalVisible}
            onClose={() => setRewardModalVisible(false)}
            childrenList={linkedChildren}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f58426'
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  headerButtons: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  headerButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  headerButtonText: {
    color: '#000',
    fontWeight: '600'
  },
  buttonSection: {
    backgroundColor: '#f2f4f8',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  buttonIcon: {
    marginRight: 8
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  cancelText: {
    color: '#007bff',
    marginTop: 20
  }
});
