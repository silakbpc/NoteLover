import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from './screens/UserListScreen';
import NotesScreen from './screens/NotesScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import AddUserScreen from './screens/AddUserScreen'; 

export type RootStackParamList = {
  Users: undefined;
  Notes: { userId: string };
  AddNote: { userId: string };
  AddUser: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Users">
      <Stack.Screen
        name="Users"
        component={UserListScreen}
        options={{ title: 'Kullanıcılar' }}
      />
      <Stack.Screen
        name="Notes"
        component={NotesScreen}
        options={{ title: 'Notlar' }}
      />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ title: 'Not Ekle' }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUserScreen}
        options={{ title: 'Kullanıcı Ekle' }} 
      />
    </Stack.Navigator>
  );
}
