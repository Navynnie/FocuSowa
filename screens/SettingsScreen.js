import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AvatarContext } from '../context/AvatarContext';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
    const navigation = useNavigation();
    const { avatar, setAvatar, soundEnabled, setSoundEnabled } = useContext(AvatarContext);
    const [nickname, setNickname] = useState('');
    const [editingName, setEditingName] = useState(false);
    const [soundObject, setSoundObject] = useState(null);

    const avatarSource = avatar === 'cat' ? require('../assets/cat.png') : require('../assets/dog.png');

    useEffect(() => {
        const loadNickname = async () => {
            const storedNickname = await AsyncStorage.getItem('nickname');
            if (storedNickname) setNickname(storedNickname);
        };
        loadNickname();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('nickname', nickname);
    }, [nickname]);

    useEffect(() => {
        let sound;
        const loadSound = async () => {
            try {
                const { sound: newSound } = await Audio.Sound.createAsync(require('../assets/music.mp3'));
                newSound.setIsLoopingAsync(true);
                setSoundObject(newSound);
                if (soundEnabled) await newSound.playAsync();
            } catch (error) {
                console.error('Błąd przy ładowaniu dźwięku:', error);
            }
        };
        loadSound();
        return () => {
            if (soundObject) soundObject.unloadAsync();
        };
    }, []);

    useEffect(() => {
        if (soundObject) {
            if (soundEnabled) {
                soundObject.playAsync();
            } else {
                soundObject.pauseAsync();
            }
        }
    }, [soundEnabled]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/settings_bg.png')} style={styles.background} />
            <View style={styles.overlay}>
                <Text style={styles.header}>Ustawienia</Text>

                <Text style={styles.label}>Logowanie</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Zaloguj!</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Dźwięk</Text>
                <View style={styles.soundButtons}>
                    <TouchableOpacity
                        style={[styles.toggleButton, soundEnabled && styles.activeButton]}
                        onPress={() => setSoundEnabled(true)}
                    >
                        <Text style={styles.buttonText}>🎵 Włącz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, !soundEnabled && styles.activeButton]}
                        onPress={() => setSoundEnabled(false)}
                    >
                        <Text style={styles.buttonText}>🎵 Wyłącz</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Ustawienia konta</Text>

                <TouchableOpacity style={styles.button} onPress={() => setEditingName(true)}>
                    <Text style={styles.buttonText}>
                        {editingName ? '' : `Nazwa Użytkownika: ${nickname || 'Kliknij, aby edytować'}`}
                    </Text>
                </TouchableOpacity>
                {editingName && (
                    <TextInput
                        style={styles.input}
                        value={nickname}
                        onChangeText={setNickname}
                        onBlur={() => setEditingName(false)}
                        placeholder="Wpisz pseudonim"
                        placeholderTextColor="#ccc"
                    />
                )}

                <Text style={styles.label}>Avatar</Text>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={() => setAvatar('cat')}>
                        <Image
                            source={require('../assets/cat.png')}
                            style={[styles.avatarIcon, avatar === 'cat' && styles.selectedAvatar]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAvatar('dog')}>
                        <Image
                            source={require('../assets/dog.png')}
                            style={[styles.avatarIcon, avatar === 'dog' && styles.selectedAvatar]}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Powrót</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 70,
        marginBottom: 70,
        color: 'black',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        color: 'black',
    },
    button: {
        backgroundColor: '#6A1B9A',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginBottom: 10,
    },
    toggleButton: {
        backgroundColor: '#6A1B9A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    activeButton: {
        backgroundColor: '#AB47BC',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    soundButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#6A1B9A',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: 'black',
        width: 200,
    },
    avatarContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 10,
    },
    avatarIcon: {
        width: 100,
        height: 100,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedAvatar: {
        borderColor: '#FFB300',
    },
    backButton: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: '#6A1B9A',
    },
    backText: {
        color: 'white',
        fontWeight: 'bold',
    },
});