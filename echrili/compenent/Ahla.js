// HomePage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Ahla = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>مرحبا بكم </Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Add')}
      >
        <Icon name="plus" size={30} color="#007BFF" />
        <Text style={styles.optionText}>اضافة منتجات</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Buy')}
      >
        <Icon name="list" size={30} color="#007BFF" />
        <Text style={styles.optionText}>المنتجات المضافة</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Orders')}
      >
        <Icon name="shopping-cart" size={30} color="#007BFF" />
        <Text style={styles.optionText}>طلبات الشراء</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Addus')}
      >
        <Icon name="users" size={30} color="#007BFF" />
        <Text style={styles.optionText}>المستخدمين</Text>
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

export default Ahla;
