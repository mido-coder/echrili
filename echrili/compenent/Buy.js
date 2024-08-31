import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebase/firebase'; // تأكد من المسار الصحيح
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; // استخدام أيقونات Ionicons

const Buy = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(firestore, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="cart" size={24} color="black" />
          <Text style={styles.cartCount}>{cart.length}</Text>
        </View>
      ),
    });
  }, [navigation, cart]);

  const addToCart = async (product) => {
    if (product.quantity > 0) {
      setCart(prevCart => [...prevCart, product]);
      
      // تحديث كمية المنتج في قاعدة البيانات
      const productRef = doc(firestore, 'products', product.id);
      await updateDoc(productRef, {
        quantity: product.quantity - 1,
      });

      // تحديث كمية المنتج محليًا
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    } else {
      Alert.alert('Out of Stock', 'This product is out of stock.');
    }
  };

  const viewCart = () => {
    navigation.navigate('Cart', { cart });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      ) : (
        <Text style={styles.itemText}>No Image</Text>
      )}
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>Price: دج{item.price}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
      <Button title="اضافة للسلة" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button title="شراء" onPress={viewCart} />
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
  },
  itemText: {
    fontSize: 16,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cartCount: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Buy;
