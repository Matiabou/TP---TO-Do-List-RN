import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Swipeable } from 'react-native-gesture-handler';

const TaskItem = ({ task, onToggle, onDelete }) => {

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete()}>
      <Icon name='delete' type='material' color='white' />
    </TouchableOpacity>
  );

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar' },
        {
          text: 'Eliminar',
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={[styles.container, task.completed && styles.completed]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onToggle}>
            <Icon
              name={task.completed ? 'check-circle' : 'circle'}
              type='font-awesome'
              color={task.completed ? 'green' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  completed: {
    backgroundColor: '#e0ffe0',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 10,
  },
});

export default TaskItem;
