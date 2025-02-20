import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTasks = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Erreur de chargement des tâches', error);
    return [];
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Erreur de sauvegarde des tâches', error);
  }
};

export const deleteAllTasks = async () => {
  try {
    await AsyncStorage.removeItem('tasks');
  } catch (error) {
    console.error('Erreur de suppression des tâches', error);
  }
}
