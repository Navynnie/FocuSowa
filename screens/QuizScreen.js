import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import openai from '../utils/openaiConfig';

export default function QuizScreen({ route }) {
  const { content } = route.params;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (content) {
      generateQuestionsFromAI(content);
    }
  }, [content]);

  const generateQuestionsFromAI = async (text) => {
    try {
      const prompt = `
Wygeneruj quiz z 3 pytaniami wielokrotnego wyboru na podstawie tego tekstu.
Zwróć pytania jako obiekt JSON w tym formacie:

[
  {
    "question": "Jakie jest główne przesłanie tekstu?",
    "options": ["Opcja A", "Opcja B", "Opcja C"],
    "correctAnswer": "Opcja A"
  },
  ...
]

Tekst PDF:
"""${text.slice(0, 2000)}"""
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      const aiText = response.choices[0].message.content.trim();
      const parsed = JSON.parse(aiText);

      setQuestions(parsed);
    } catch (err) {
      Alert.alert('Błąd AI', 'Nie udało się wygenerować pytań z OpenAI.');
      console.error('OpenAI error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selected, correct) => {
    Alert.alert(selected === correct ? '✔️ Dobrze!' : '❌ Błąd', `Poprawna odpowiedź:\n${correct}`);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Generuję pytania z AI...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {questions.map((q, i) => (
        <View key={i} style={styles.questionBlock}>
          <Text style={styles.question}>{q.question}</Text>
          {q.options.map((opt, idx) => (
            <Button key={idx} title={opt} onPress={() => handleAnswer(opt, q.correctAnswer)} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  questionBlock: { marginBottom: 30, backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10 },
  question: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
});


