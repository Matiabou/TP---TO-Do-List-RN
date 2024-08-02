import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      description: taskDescription,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTaskName('');
    setTaskDescription('');
    setModalVisible(false);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    Alert.alert('Eliminar Tarea', '¿Estás seguro de que deseas eliminar esta tarea?', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== taskId);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onToggle={() => toggleTaskCompletion(item.id)}
      onDelete={() => deleteTask(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Button title="Agregar Tarea" onPress={() => setModalVisible(true)} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {modalVisible && (
        <View style={styles.modal}>
          <Input
            placeholder="Nombre de la tarea"
            value={taskName}
            onChangeText={setTaskName}
          />
          <Input
            placeholder="Descripción de la tarea"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <Button title="Guardar" onPress={addTask} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modal: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
});

export default HomeScreen;
