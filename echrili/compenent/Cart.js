import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';

const Cart = ({ route, navigation }) => {
  const { cart } = route.params;

  const handleChari = () => {
    navigation.navigate('Chari', { cart });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      ) : (
        <Text style={styles.itemText}>No Image</Text>
      )}
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>Price: ${item.price}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.id} // تأكد من أن `item.id` فريد
      />
      <Button title="شراء" onPress={handleChari} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default Cart;
