import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const subjects = ['polish', 'math', 'english', 'science'];

export default function UploadNotesScreen() {
  const navigation = useNavigation();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const saveNote = async (newNote) => {
    try {
      const existing = await AsyncStorage.getItem('userNotes');
      const notes = existing ? JSON.parse(existing) : [];
      notes.push(newNote);
      await AsyncStorage.setItem('userNotes', JSON.stringify(notes));
    } catch (error) {
      console.error('Błąd zapisu notatki:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedSubject) {
      Alert.alert('Wybierz przedmiot', 'Proszę wybrać przedmiot przed dodaniem notatki.');
      return;
    }

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) return;

      const file = result.assets[0];

      const newNote = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        subject: selectedSubject,
      };

      await saveNote(newNote);

      Alert.alert('Sukces', 'Notatka została dodana!');
      navigation.navigate('Learn');
    } catch (error) {
      console.error('Błąd przy wgrywaniu pliku:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/upload_bg.png')}
      style={styles.background}
    >
      <Image source={require('../../assets/focusowa_logo.png')} style={styles.logo} />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Powrót</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Dodaj notatki</Text>

      <View style={styles.subjectsContainer}>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject}
            style={[
              styles.subjectButton,
              selectedSubject === subject && styles.subjectSelected,
            ]}
            onPress={() => setSelectedSubject(subject)}
          >
            <Text style={styles.subjectText}>
              {subject === 'polish'
                ? 'Język polski'
                : subject === 'math'
                ? 'Matematyka'
                : subject === 'english'
                ? 'Język angielski'
                : 'Przyroda'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.uploadBox}>
        <Image
          source={require('../../assets/notes.png')}
          style={styles.notesImage}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleFileUpload}>
          <Text style={styles.addButtonText}>dodaj +</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/wiew_1.png')}
          style={styles.wiewImage}
          resizeMode="contain"
        />
      </View>

      <Image
        source={require('../../assets/liscie.png')}
        style={styles.leafImage}
        resizeMode="contain"
      />

      <Image
        source={require('../../assets/wiew_2.png')}
        style={styles.wiew2Image}
        resizeMode="contain"
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 8,
  },
  backText: {
    fontSize: 20,
    color: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6B3FA0',
    marginTop: 180,
    marginBottom: 20,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  subjectButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 6,
    borderRadius: 12,
  },
  subjectSelected: {
    backgroundColor: '#6B3FA0',
  },
  subjectText: {
    color: '#000',
  },
  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
    position: 'relative',
  },
  notesImage: {
    width: width * 1.0,
    height: width * 1.0,
    marginBottom: 0,
  },
  addButton: {
    position: 'absolute',
    top: '36%',
    alignSelf: 'center',
    backgroundColor: '#6B3FA0',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 40,
    zIndex: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  wiewImage: {
    position: 'absolute',
    top: '20%',
    left: '60%',
    width: 170,
    height: 170,
    zIndex: 1,
  },
  leafImage: {
    position: 'absolute',
    bottom: -10,
    left: -40,
    width: 280,
    height: 280,
  },
  wiew2Image: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 120,
    height: 120,
    zIndex: 3,
  },
});



