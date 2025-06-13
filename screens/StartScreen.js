import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { AvatarContext } from '../context/AvatarContext';

export default function StartScreen() {
    const navigation = useNavigation();
    const { soundEnabled } = useContext(AvatarContext);

    useEffect(() => {
        let soundObject = null;
        const playMusic = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(require('../assets/music.mp3'));
                soundObject = sound;
                await soundObject.setIsLoopingAsync(true);
                if (soundEnabled) {
                    await soundObject.playAsync();
                }
            } catch (error) {
                console.log('Błąd odtwarzania muzyki:', error);
            }
        };
        playMusic();

        return () => {
            if (soundObject) {
                soundObject.unloadAsync();
            }
        };
    }, [soundEnabled]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/background.png')} style={styles.background} />

            <TouchableOpacity
                style={styles.gearButton}
                onPress={() => navigation.navigate('Settings')}
            >
                <Image source={require('../assets/icon_settings.png')} style={styles.gearIcon} />
            </TouchableOpacity>

            <Text style={styles.title}>FocuSowa</Text>

            <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate('Menu')}
            >
                <Text style={styles.startText}>Zaczynamy!</Text>
            </TouchableOpacity>
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
        resizeMode: 'cover',
    },
    gearButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    gearIcon: {
        width: 50,
        height: 50,
    },
    title: {
        position: 'absolute',
        top: '15%',
        alignSelf: 'center',
        fontSize: 55,
        fontWeight: 'bold',
        color: 'black',
        textShadowColor: 'rgba(255,255,255,0.7)',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 2,
    },
    startButton: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        backgroundColor: '#6A1B9A',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    startText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
    },
});



