import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { User } from '../types';
import { UserCard } from '../components/UserCard';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type UserListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Users'>;

const UserListScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<UserListScreenNavigationProp>();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://192.168.1.102:8082/api/users');
      setUsers(res.data);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Kullanıcılar 💗</Text>
        {users.map(user => (
          <View key={user._id} style={styles.cardWrapper}>
            <UserCard
              user={user}
              onPress={() => navigation.navigate('Notes', { userId: user._id })}
            />
          </View>
        ))}
      </ScrollView>

      {/* Kullanıcı Ekle Butonu */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff0f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d63384',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardWrapper: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#f8c2d6',
    borderWidth: 1,
    shadowColor: '#d63384',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    backgroundColor: '#d63384',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
