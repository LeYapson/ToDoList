import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, toggleTask, deleteTask, theme }) {

    if (tasks.length === 0) {
        return <Text style={{ textAlign: 'center', color: theme.text }}>Aucune tâche pour le moment.</Text>;
      }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskItem task={item} toggleTask={toggleTask} deleteTask={deleteTask} theme={theme} />
      )}
    />
  );
}
