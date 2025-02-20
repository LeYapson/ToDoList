import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';

export default function TaskItem({ task, toggleTask, deleteTask, theme }) {
  return (
    <Animated.View
      entering={FadeInLeft.duration(500)}
      exiting={FadeOutRight.duration(300)}
      style={[styles.task, { backgroundColor: theme.taskBackground }]}
    >
      <TouchableOpacity onPress={() => toggleTask(task.id)}>
        <Text style={[styles.taskTitle, { color: theme.text }]}>
          {task.title}
        </Text>
        <Text style={[styles.taskText, task.completed && styles.completed, { color: theme.text }]}>
          {task.description}
        </Text>
        <Text style={[styles.categoryText, { color: theme.text }]}>📌 {task.category}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(task.id)}>
        <Text style={[styles.deleteButton, { color: theme.text }]}>❌</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  taskTitle: { fontSize: 18, fontWeight: 'bold' },
  taskText: { fontSize: 16 },
  categoryText: { fontSize: 12, color: 'gray' },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  deleteButton: { fontSize: 16 },
});
