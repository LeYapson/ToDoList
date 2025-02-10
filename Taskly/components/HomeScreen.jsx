import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import { loadTasks, saveTasks } from './Storage';
import { lightTheme, darkTheme } from './theme';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(lightTheme);

  // Charger le thème depuis AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
  }, [tasks]);
  

  // Basculer entre les thèmes et enregistrer le choix
  const toggleTheme = async () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
  };

  const addTask = (text, category) => {
    const newTasks = [...tasks, { id: Date.now().toString(), text, category, completed: false }];
    setTasks(newTasks);
  };
  

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
    <View style={[styles.container, { backgroundColor: theme.background }]}>  
      {/* HEADER AVEC TITRE ET BOUTON THÈME */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>📋 To-Do List</Text>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <Text style={[styles.themeButtonText, { color: theme.text }]}>
            {theme === lightTheme ? '🌙' : '☀️'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bouton de navigation vers les statistiques */}
      <TouchableOpacity style={styles.statsButton} onPress={() => navigation.navigate('Stats', { tasks, theme })}>
  <Text style={styles.statsButtonText}>📊 Voir les Statistiques</Text>
</TouchableOpacity>


      <TaskInput addTask={addTask} theme={theme} />
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} theme={theme} />
      ) : (
        <Text style={[styles.emptyText, { color: theme.text }]}>Aucune tâche ajoutée. Ajoute ta première tâche ! 📌</Text>
      )}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  themeButton: { padding: 10, borderRadius: 10, backgroundColor: '#666' },
  themeButtonText: { fontSize: 18, fontWeight: 'bold' },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20 },
  statsButton: { padding: 10, borderRadius: 10, backgroundColor: '#007AFF', alignItems: 'center', marginVertical: 10 },
  statsButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});