import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Note } from '../types/index';

interface Props {
  note: Note;
}

export const NoteCard: React.FC<Props> = ({ note }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{note.title}</Text>
      <Text>{note.content}</Text>
      <Text style={styles.meta}>Tür: {note.type}</Text>
      <Text style={styles.meta}>Tarih: {new Date(note.createdAt).toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  meta: {
    color: '#666',
    fontSize: 12,
  },
});