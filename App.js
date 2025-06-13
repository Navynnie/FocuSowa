import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import StartScreen from './screens/StartScreen';
import SettingsScreen from './screens/SettingsScreen';
import MenuScreen from './screens/MenuScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import LearnScreen from './src/screens/LearnScreen';
import PolishScreen from './src/screens/PolishScreen';
import MathScreen from './src/screens/MathScreen';
import EnglishScreen from './src/screens/EnglishScreen';
import NatureScreen from './src/screens/NatureScreen';
import { AvatarProvider } from './context/AvatarContext';
import UploadNotesScreen from './src/screens/UploadNotesScreen';
import NoteViewer from './src/screens/NoteViewer';
import FlashcardsScreen from './src/screens/FlashcardsScreen';
import MyFlashcardsScreen from './src/screens/MyFlashcardsScreen';
import QuizScreen from './src/screens/QuizScreen';
import TasksScreen from './src/screens/TasksScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AvatarProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="Learn" component={LearnScreen} />
            <Stack.Screen name="Polish" component={PolishScreen} />
            <Stack.Screen name="Math" component={MathScreen} />
            <Stack.Screen name="English" component={EnglishScreen} />
            <Stack.Screen name="Nature" component={NatureScreen} />
            <Stack.Screen name="UploadNotes" component={UploadNotesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NoteViewer" component={NoteViewer} />
            <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
            <Stack.Screen name="MyFlashcards" component={MyFlashcardsScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Tasks" component={TasksScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AvatarProvider>
  );
}





