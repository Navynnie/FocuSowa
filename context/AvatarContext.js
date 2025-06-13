import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState('cat');
  const [username, setUsername] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedAvatar = await AsyncStorage.getItem('avatar');
        const storedUsername = await AsyncStorage.getItem('username');
        const storedSound = await AsyncStorage.getItem('soundEnabled');

        if (storedAvatar) setAvatar(storedAvatar);
        if (storedUsername) setUsername(storedUsername);
        if (storedSound !== null) setSoundEnabled(storedSound === 'true');
      } catch (e) {
        console.log('Błąd przy wczytywaniu danych:', e);
      }
    };

    loadData();
  }, []);

  // Zapisuj zmiany do pamięci
  useEffect(() => {
    AsyncStorage.setItem('avatar', avatar);
  }, [avatar]);

  useEffect(() => {
    AsyncStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    AsyncStorage.setItem('soundEnabled', soundEnabled.toString());
  }, [soundEnabled]);

  return (
    <AvatarContext.Provider
      value={{ avatar, setAvatar, username, setUsername, soundEnabled, setSoundEnabled }}
    >
      {children}
    </AvatarContext.Provider>
  );
};


