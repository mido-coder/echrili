// HomePage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Addus= () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>لمستخدمين</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Users')}
      >
        <Icon name="plus" size={30} color="#007BFF" />
        <Text style={styles.optionText}>اضافة مستخدم</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Uss')}
      >
        <Icon name="list" size={30} color="#007BFF" />
        <Text style={styles.optionText}>المستخدمين </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('SoldProducts')}
      >
        <Icon name="shopping-cart" size={30} color="#007BFF" />
        <Text style={styles.optionText}>عرض</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Users')}
      >
        <Icon name="users" size={30} color="#007BFF" />
        <Text style={styles.optionText}> طلب</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 20,
    color: '#007BFF',
  },
});

export default Addus;
