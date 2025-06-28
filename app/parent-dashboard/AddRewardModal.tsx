// components/AddRewardModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  CheckBox
} from 'react-native';
import axios from 'axios';

export default function AddRewardModal({ visible, onClose, parentId }) {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [rewardType, setRewardType] = useState('');
  const [otherType, setOtherType] = useState('');
  const [childrenList, setChildrenList] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);

  useEffect(() => {
    if (parentId) {
      axios.get(`/api/children?parentId=${parentId}`)
        .then(res => setChildrenList(res.data))
        .catch(err => console.error(err));
    }
  }, [parentId]);

  const toggleChild = (childId) => {
    if (selectedChildren.includes(childId)) {
      setSelectedChildren(selectedChildren.filter(c => c !== childId));
    } else {
      setSelectedChildren([...selectedChildren, childId]);
    }
  };

  const handleSubmit = () => {
    const rewardData = {
      name,
      points: parseInt(points),
      description,
      type: rewardType === 'Other' ? otherType : rewardType,
      assignedChildren: selectedChildren
    };

    axios.post('/api/rewards', rewardData)
      .then(() => {
        onClose();
        // Optionally reset state
      })
      .catch(err => console.error(err));
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.title}>Add New Reward</Text>

            <Text style={styles.label}>Reward Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter reward name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Points Cost</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={points}
              onChangeText={setPoints}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Reward Type</Text>
            <ScrollView horizontal style={{ marginVertical: 8 }}>
              {["Money", "Movie Night", "Day Out", "Sweet Treat", "Other"].map(type => (
                <Pressable
                  key={type}
                  style={[styles.typeOption, rewardType === type && styles.typeSelected]}
                  onPress={() => setRewardType(type)}
                >
                  <Text style={{ color: rewardType === type ? '#fff' : '#333' }}>{type}</Text>
                </Pressable>
              ))}
            </ScrollView>

            {rewardType === 'Other' && (
              <TextInput
                style={styles.input}
                placeholder="Specify other reward type"
                value={otherType}
                onChangeText={setOtherType}
              />
            )}

            <Text style={styles.label}>Assign to Children</Text>
            {childrenList.map((child) => (
              <View key={child.id} style={styles.checkboxRow}>
                <CheckBox
                  value={selectedChildren.includes(child.id)}
                  onValueChange={() => toggleChild(child.id)}
                />
                <Text style={styles.checkboxLabel}>{child.name}</Text>
              </View>
            ))}

            <View style={styles.footer}>
              <Pressable onPress={onClose} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSubmit} style={styles.createBtn}>
                <Text style={styles.createText}>Create Reward</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalContainer: { backgroundColor: '#fff', borderRadius: 10, padding: 20, maxHeight: '90%' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 10, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 10, marginTop: 4 },
  textArea: { height: 80 },
  typeOption: { padding: 10, backgroundColor: '#eee', borderRadius: 6, marginRight: 8 },
  typeSelected: { backgroundColor: '#f58426' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  checkboxLabel: { marginLeft: 8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelBtn: { backgroundColor: '#007bff', padding: 10, borderRadius: 6, flex: 1, marginRight: 10, alignItems: 'center' },
  cancelText: { color: '#fff', fontWeight: 'bold' },
  createBtn: { backgroundColor: '#f58426', padding: 10, borderRadius: 6, flex: 1, marginLeft: 10, alignItems: 'center' },
  createText: { color: '#fff', fontWeight: 'bold' }
});
