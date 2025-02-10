import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StatsScreen({ navigation, route }) {
  const { tasks, theme } = route.params;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const categories = {};
  tasks.forEach(task => {
    categories[task.category] = (categories[task.category] || 0) + 1;
  });

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
});
