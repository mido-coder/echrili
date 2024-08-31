import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firestore } from '../firebase/firebase'; // تأكد من المسار الصحيح
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Chari = ({ route, navigation }) => {
  const { cart } = route.params;
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  const handleCheckout = async () => {
    if (!buyerName || !buyerPhone) {
      Alert.alert('Error', 'يرجى إدخال اسمك ورقم هاتفك.');
      return;
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      Alert.alert('Error', 'سلة التسوق فارغة.');
      return;
    }

    try {
      const ordersCollection = collection(firestore, 'orders');
      await addDoc(ordersCollection, {
        items: cart,
        totalAmount: cart.reduce((sum, item) => sum + (item.price || 0), 0),
        buyerName,
        buyerPhone,
        createdAt: serverTimestamp(),
      });
      Alert.alert('Success', 'تم تقديم الطلب بنجاح!');
      navigation.goBack(); // العودة إلى الشاشة السابقة بعد النجاح
    } catch (error) {
      console.error('خطأ في تقديم الطلب: ', error); // تسجيل الخطأ في وحدة التحكم
      Alert.alert('Error', 'حدثت مشكلة في تقديم الطلب.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تاكيد الطلب</Text>
      <TextInput
        style={styles.input}
        placeholder="اسمك"
        value={buyerName}
        onChangeText={setBuyerName}
      />
      <TextInput
        style={styles.input}
        placeholder="رقم هاتفك"
        keyboardType="phone-pad"
        value={buyerPhone}
        onChangeText={setBuyerPhone}
      />
      <Button title="تأكيد الطلب" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default Chari;
