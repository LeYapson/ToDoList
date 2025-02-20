import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TaskInput({ addTask, theme }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('Général');

  const handleAddTask = () => {
    if (task.trim() === '') return;
    addTask(taskTitle, task, category);
    setTask('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.taskBackground }]}>  
      <Text style={[styles.label, { color: theme.text }]}>Nouvelle tâche :</Text>
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder="Titre de la tâche"
        placeholderTextColor={theme.text}
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <Text style={[styles.label, { color: theme.text }]}>Description</Text>
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholder="Description de la tâche"
        placeholderTextColor={theme.text}
        value={task}
        onChangeText={setTask}
      />

      <Text style={[styles.label, { color: theme.text }]}>Catégorie :</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={[styles.picker, { color: theme.text }]}
      >
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
  container: { width: '90%', padding: 20, backgroundColor: '#fff', borderRadius: 10, alignSelf: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 10 },
  picker: { width: '100%', marginBottom: 10 },
  addButton: { padding: 15, borderRadius: 5, alignItems: 'center', width: '100%' },
  addButtonText: { fontSize: 18, fontWeight: 'bold' },
});
