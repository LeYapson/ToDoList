import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TaskInput({ addTask, theme }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Général');

  const handleAddTask = () => {
    if (task.trim() === '') return;
    addTask(task, category);
    setTask('');
  };

  return (
    <View>
      <TextInput 
  style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]} 
  placeholderTextColor={theme.text}
  value={task} 
  onChangeText={setTask} 
  placeholder="Nouvelle tâche..." 
/>

      
      <Picker selectedValue={category} style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text }]}  onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="Général" value="Général" />
        <Picker.Item label="Travail" value="Travail" />
        <Picker.Item label="Personnel" value="Personnel" />
        <Picker.Item label="Urgent" value="Urgent" />
      </Picker>

      <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.buttonBackground }]} onPress={handleAddTask}>
        <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 10, backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#5cb85c', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10,
  },
  addButtonText: {
    color: '#fff', fontWeight: 'bold',
  },
});
