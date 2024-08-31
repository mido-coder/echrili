import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, updatePassword } from 'firebase/auth';
const Uss= () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };
    fetchUsers();
  }, []);
  const auth = getAuth();

  const updatePasswordForUser = (uid, newPassword) => {
    const userRef = doc(db, 'users', uid);
    updateDoc(userRef, { password: newPassword })
      .then(() => {
        const user = auth.currentUser;
        updatePassword(user, newPassword).then(() => {
          Alert.alert('Success', 'Password updated successfully');
        }).catch(error => {
          Alert.alert('Error', error.message);
        });
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  const deleteUser = (uid) => {
    const userRef = doc(db, 'users', uid);
    deleteDoc(userRef)
      .then(() => {
        setUsers(users.filter(user => user.id !== uid));
        Alert.alert('Success', 'User deleted successfully');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };
  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
            <Button title="Update Password" onPress={() => {
              const newPassword = prompt('Enter new password');
              if (newPassword) {
                updatePasswordForUser(item.id, newPassword);
              }
            }} />
            <Button title="Delete User" onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default Uss;