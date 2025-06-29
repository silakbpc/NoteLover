import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import axios from 'axios';
import { Note, NoteType } from '../types/index';

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const userId = route.params.userId;

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`http://192.168.1.102:8082/api/notes/${userId}`);
      setNotes(res.data);
    } catch (error) {
      console.error('fetchNotes Hata:', error);
    }
  };

  const fetchNoteTypes = async () => {
    try {
      const res = await axios.get('http://192.168.1.102:8082/api/notetypes');
      setNoteTypes(res.data);
    } catch (error) {
      console.error('fetchNoteTypes Hata:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Sil', 'Bu not silinsin mi?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil',
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.1.102:8082/api/notes/${id}`);
            fetchNotes();
            Alert.alert('Başarılı', 'Not başarıyla silindi 💔');
          } catch (error) {
            Alert.alert('Hata', 'Not silinemedi');
          }
        },
        style: 'destructive',
      },
    ]);
  };
  

  const handleUpdate = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      Alert.alert('Hata', 'Başlık ve içerik boş olamaz');
      return;
    }
  
    try {
      await axios.put(`http://192.168.1.102:8082/api/notes/${editNoteId}`, {
        title: editTitle,
        content: editContent,
      });
      setEditNoteId(null);
      setEditTitle('');
      setEditContent('');
      fetchNotes();
      Alert.alert('Başarılı', 'Not başarıyla güncellendi 💖');
    } catch (err) {
      Alert.alert('Hata', 'Güncelleme başarısız');
    }
  };
  

  useEffect(() => {
    fetchNotes();
    fetchNoteTypes();
  }, []);

  const filteredNotes = selectedType
    ? notes.filter(note => note.type === selectedType)
    : notes;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notlarım 💖</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {noteTypes.map(item => (
          <TouchableOpacity
            key={item._id}
            style={[
              styles.filterButton,
              selectedType === item.name && styles.filterButtonSelected,
            ]}
            onPress={() =>
              setSelectedType(item.name === selectedType ? '' : item.name)
            }
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedType === item.name && styles.filterButtonTextSelected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredNotes}
        keyExtractor={item => item._id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            {editNoteId === item._id ? (
              <>
                <TextInput
                  value={editTitle}
                  onChangeText={setEditTitle}
                  style={styles.input}
                  placeholder="Başlık"
                  placeholderTextColor="#999"
                />
                <TextInput
                  value={editContent}
                  onChangeText={setEditContent}
                  style={[styles.input, { height: 80 }]}
                  multiline
                  placeholder="İçerik"
                  placeholderTextColor="#999"
                />
                <View style={styles.row}>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleUpdate}>
                    <Text style={styles.btnText}>Kaydet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => {
                      setEditNoteId(null);
                      setEditTitle('');
                      setEditContent('');
                    }}
                  >
                    <Text style={styles.btnText}>İptal</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteContent}>{item.content}</Text>
                <Text style={styles.noteMeta}>Tür: {item.type}</Text>
                <Text style={styles.noteMeta}>
                  Oluşturuldu: {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() =>
                      Alert.alert('Not Detay', `Başlık: ${item.title}\nİçerik: ${item.content}`)
                    }
                  >
                    <Text style={styles.btnText}>Görüntüle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.updateBtn}
                    onPress={() => {
                      setEditNoteId(item._id);
                      setEditTitle(item.title);
                      setEditContent(item.content);
                    }}
                  >
                    <Text style={styles.btnText}>Güncelle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item._id)}>
                    <Text style={styles.btnText}>Sil</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNote', { userId })}
      >
        <Text style={styles.addButtonText}>+ Yeni Not Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 12,
    textAlign: 'center',
  },
  filterBar: {
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: '#ffe6f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d63384',
  },
  filterButtonSelected: {
    backgroundColor: '#d63384',
  },
  filterButtonText: {
    color: '#d63384',
    fontWeight: 'bold',
  },
  filterButtonTextSelected: {
    color: 'white',
  },
  noteCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderColor: '#d63384',
    borderWidth: 1,
    shadowColor: '#d63384',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 6,
  },
  noteContent: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  noteMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewBtn: {
    backgroundColor: '#fa89be',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
  },
  updateBtn: {
    backgroundColor: '#ff9bbd',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 6,
  },
  deleteBtn: {
    backgroundColor: '#e75480',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
  },
  saveBtn: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
  },
  cancelBtn: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffb6d8',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    color: '#d63384',
  },
  addButton: {
    backgroundColor: '#d63384',
    padding: 16,
    borderRadius: 50,
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    paddingHorizontal: 30,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
