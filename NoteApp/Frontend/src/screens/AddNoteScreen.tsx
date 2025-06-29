import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

interface NoteType {
  _id: string;
  name: string;
}

export default function AddNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const userId = route.params.userId;

  useEffect(() => {
    const fetchNoteTypes = async () => {
      try {
        const res = await axios.get('http://192.168.1.102:8082/api/notetypes');
        setNoteTypes(res.data);
      } catch (error: any) {
        if (error.response) {
          console.error('Hata:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('İstek atıldı ama cevap yok:', error.request);
        } else {
          console.error('Hata mesajı:', error.message);
        }
      }
    };
    fetchNoteTypes();
  }, []);

  const handleAddNote = async () => {
    if (!title || !content || !type) {
      Alert.alert('Hata', 'Tüm alanları doldurun');
      return;
    }

    try {
      await axios.post('http://192.168.1.102:8082/api/notes', {
        title,
        content,
        type,
        userId,
      });
      navigation.goBack();
    } catch (error: any) {
      if (error.response) {
        Alert.alert('Hata', `Not eklenemedi: ${error.response.status}`);
      } else if (error.request) {
        Alert.alert('Hata', 'İstek atıldı ama cevap alınamadı');
      } else {
        Alert.alert('Hata', `Bir hata oluştu: ${error.message}`);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Yeni Not Ekle</Text>

      <TextInput
        placeholder="Başlık"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="İçerik"
        value={content}
        onChangeText={setContent}
        multiline
        style={[styles.input, styles.textArea]}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Tür Seçin" value="" />
          {noteTypes.map((nt) => (
            <Picker.Item key={nt._id} label={nt.name} value={nt._id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text style={styles.buttonText}>Not Ekle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff0f5',
    flexGrow: 1,
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
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d63384',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#d63384',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
