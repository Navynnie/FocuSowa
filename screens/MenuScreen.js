import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/settings_bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Powrót</Text>
        </TouchableOpacity>

        <Text style={styles.title}>FocuSowa</Text>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={styles.menuText}>Ucz się!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Calendar')}
        >
          <View style={styles.row}>
            <Image source={require('../assets/calendar.png')} style={styles.icon} />
            <Text style={styles.menuText}>Terminarz</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Flashcards')}
        >
          <Text style={styles.menuText}>Fiszki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('MyFlashcards')}
        >
          <Text style={styles.menuText}>Moje fiszki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.menuText}>Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Tasks')}
        >
          <Text style={styles.menuText}>Moje zadania</Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/panda.png')}
          style={styles.panda}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 50,
  },
  backButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 40,
    backgroundColor: '#6B3FA0',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  backText: {
    color: 'white',
    fontSize: 14,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  menuButton: {
    backgroundColor: '#6B3FA0',
    padding: 14,
    borderRadius: 28,
    marginVertical: 8,
    width: '70%',
    alignItems: 'center',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  panda: {
    width: 200,
    height: 200,
    marginTop: 60,
  },
});



