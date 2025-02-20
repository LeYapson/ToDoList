import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteAllTasks } from './Storage'; // Assurez-vous que cette fonction existe dans storage.js

export default function StatsScreen({ navigation, route }) {
  const { tasks, theme } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const categories = {};
  tasks.forEach(task => {
    categories[task.category] = (categories[task.category] || 0) + 1;
  });

  const handleDeleteConfirmation = () => {
    deleteAllTasks().then(() => {
      Alert.alert('Toutes les tâches ont été supprimées.');
      navigation.goBack();
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>📊 Statistiques</Text>

        <Text style={[styles.statsText, { color: theme.text }]}>Total des tâches : {totalTasks}</Text>
        <Text style={[styles.statsText, { color: theme.text }]}>✅ Complétées : {completedTasks}</Text>
        <Text style={[styles.statsText, { color: theme.text }]}>❌ Non complétées : {pendingTasks}</Text>

        <Text style={[styles.subTitle, { color: theme.text }]}>🔍 Par Catégorie :</Text>
        {Object.entries(categories).map(([category, count]) => (
          <Text key={category} style={[styles.statsText, { color: theme.text }]}>
            {category} : {count} tâches
          </Text>
        ))}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>⬅ Retour</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.deleteButtonText}>Supprimer toutes les tâches</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Confirmer la suppression</Text>
              <Text style={[styles.modalText, { color: theme.text }]}>Êtes-vous sûr de vouloir supprimer toutes les tâches ?</Text>
              <TouchableOpacity style={styles.confirmButton} onPress={handleDeleteConfirmation}>
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  statsText: { fontSize: 18, marginBottom: 5 },
  subTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  backButton: { padding: 10, borderRadius: 10, backgroundColor: '#007AFF', alignItems: 'center', marginTop: 20 },
  backButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  deleteButton: { padding: 10, borderRadius: 10, backgroundColor: '#FF5733', alignItems: 'center', marginTop: 20 },
  deleteButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  confirmButton: { padding: 10, borderRadius: 10, backgroundColor: '#FF5733', marginTop: 10 },
  confirmButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  cancelButton: { padding: 10, borderRadius: 10, backgroundColor: '#666', marginTop: 10 },
  cancelButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
