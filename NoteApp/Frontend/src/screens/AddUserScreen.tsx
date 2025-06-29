import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function AddUserScreen() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  const handleAddUser = async () => {
    if (!username) {
      Alert.alert('Hata', 'Kullanıcı adı boş olamaz');
      return;
    }
    try {
      await axios.post('http://192.168.1.102:8082/api/users', { username });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Hata', 'Kullanıcı eklenemedi');
      console.error('API Hatası:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Kullanıcı Ekle</Text>
      
      <TextInput
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Ekle</Text>
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
  button: {
    backgroundColor: '#d63384',
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
