import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadTasks();
  }, [isFocused]);

  const loadTasks = async () => {
    const stored = await AsyncStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  };

  const toggleDone = async (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
  };

  const deleteTask = async (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
  };

  return (
    <ImageBackground
      source={require('../../assets/background_tasks.png')}
      style={styles.background}
    >
      {/* Logo w lewym górnym rogu */}
      <Image source={require('../../assets/focusowa_logo.png')} style={styles.logo} />

      {/* Tytuł „Moje zadania” */}
      <Text style={styles.title}>Moje zadania</Text>

      {/* Sowa + przycisk „Dodaj zadanie” */}
      <View style={styles.owlContainer}>
        <Image source={require('../../assets/owl.png')} style={styles.owl} />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
          <Text style={styles.addButtonText}>Dodaj zadanie</Text>
        </TouchableOpacity>
      </View>

      {/* Lista zadań */}
      <FlatList
        style={{ marginTop: 20 }}
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.task}>
            <TouchableOpacity
              style={styles.taskInfo}
              onPress={() => toggleDone(index)}
            >
              <Text style={styles.taskText}>
                {item.name} - {item.subject} - {item.date}
              </Text>
              {/* ✔️ tylko jeśli done=true */}
              {item.done && <Text style={styles.check}>✔️</Text>}
            </TouchableOpacity>

            {/* Ikona kosza */}
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.trash}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Przycisk powrotu */}
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Powrót</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', padding: 20, alignItems: 'center' },

  logo: {
    position: 'absolute',
    top: 40,
    left: 1,
    width: 220,
    height: 120,
    resizeMode: 'contain'
  },

  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#b0006d',
    marginTop: 120,
    textAlign: 'center'
  },

  owlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },

  owl: { width: 100, height: 100, marginRight: 20 },

  task: {
    backgroundColor: '#6a42a1',
    padding: 15,
    marginVertical: 10,
    borderRadius: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },

  taskText: { color: '#fff', fontSize: 16 },

  check: {
    fontSize: 24,
    marginLeft: 10,
    color: 'lime'
  },

  trash: {
    fontSize: 24,
    color: 'white',
    marginLeft: 10
  },

  addButton: {
    backgroundColor: '#300060',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30
  },

  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  back: { position: 'absolute', top: 60, right: 20 },

  backText: {
    color: '#fff',
    backgroundColor: '#6a42a1',
    padding: 10,
    borderRadius: 20,
    fontWeight: 'bold'
  }
});
