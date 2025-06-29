import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { NoteType } from '../types';

export default function EditNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);

  const navigation = useNavigation();
  const route = useRoute<any>();
  const { noteId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noteRes = await axios.get(`http://192.168.1.102:8082/api/notes/${noteId}`);
        const note = noteRes.data;
        setTitle(note.title);
        setContent(note.content);
        setType(note.type);

        const typesRes = await axios.get('http://192.168.1.102:8082/api/notetypes');
        setNoteTypes(typesRes.data);
      } catch (err) {
        Alert.alert('Hata', 'Veriler alınamadı');
        console.error('API Hatası:', err);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!title || !content || !type) {
      Alert.alert('Hata', 'Tüm alanlar doldurulmalı');
      return;
    }
    try {
      await axios.put(`http://192.168.1.102:8082/api/notes/${noteId}`, {
        title,
        content,
        type,
      });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Hata', 'Not güncellenemedi');
      console.error('PUT Hatası:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.1.102:8082/api/notes/${noteId}`);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Hata', 'Not silinemedi');
      console.error('DELETE Hatası:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notu Güncelle</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Başlık"
        placeholderTextColor="#999"
        style={styles.input}
      />

      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="İçerik"
        placeholderTextColor="#999"
        multiline
        style={[styles.input, { height: 100 }]}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={setType}
          style={styles.picker}
        >
          <Picker.Item label="Tür Seçin" value="" />
          {noteTypes.map((nt) => (
            <Picker.Item key={nt._id} label={nt.name} value={nt.name} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Güncelle</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff0f5',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d63384',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d63384',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#d63384',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
