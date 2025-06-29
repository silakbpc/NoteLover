import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { User } from '../types/index';

interface Props {
  user: User;
  onPress: () => void;
}

export const UserCard: React.FC<Props> = ({ user, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.username}>{user.username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
