import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import { loadTasks, saveTasks } from './Storage';
import { lightTheme, darkTheme } from './theme';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  const [modalVisible, setModalVisible] = useState(false);

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

  const toggleTheme = async () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
  };

  const addTask = (text, category) => {
    const newTask = { id: Date.now().toString(), text, category, completed: false };
    const sortedTasks = [newTask, ...tasks].sort((a, b) => (a.category === 'Urgent' ? -1 : 1));
    setTasks(sortedTasks);
    setModalVisible(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const categorizedTasks = tasks.reduce((acc, task) => {
    if (!task.completed) {
      if (!acc[task.category]) acc[task.category] = [];
      acc[task.category].push(task);
    }
    return acc;
  }, {});

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>  
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>📋 Taskly</Text>
          <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
            <Text style={[styles.themeButtonText, { color: theme.text }]}> {theme === lightTheme ? '🌙' : '☀️'} </Text>
          </TouchableOpacity>
        </View>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>Aucune tâche pour le moment.</Text>
          <Text style={[styles.emptyText, { color: theme.text }]}>Ajoutez-en une avec le +</Text>
        </View>
      ) : (
        <FlatList
          data={Object.entries(categorizedTasks)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            <View>
              <Text style={[styles.categoryTitle, { color: theme.text }]}>{item[0]}</Text>
              <TaskList tasks={item[1]} toggleTask={toggleTask} deleteTask={deleteTask} theme={theme} />
            </View>
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TaskInput addTask={addTask} theme={theme} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.statsButton} onPress={() => navigation.navigate('Stats', { tasks, theme })}>
        <Text style={styles.statsButtonText}>≡</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerContainer: { width: '100%', marginBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  themeButton: { padding: 10, borderRadius: 10, backgroundColor: '#666' },
  themeButtonText: { fontSize: 18, fontWeight: 'bold' },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  emptyContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF5733',
    borderRadius: 5,
  },
  closeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: { fontSize: 30, color: '#fff' },
  statsButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  statsButtonText: { fontSize: 30, color: '#fff' },
});
