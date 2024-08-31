import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { firestore, storage } from '../firebase/firebase'; // تأكد من المسار الصحيح
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Add = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Permissions status:', status); // تحقق من حالة التصريحات
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
      }
    };

    requestPermissions();
  }, []);

  const handleImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image picker result:', result); // تحقق من نتيجة اختيار الصورة

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri); // تأكد من استخدام URI الصحيح
        console.log('Selected image URI:', result.assets[0].uri); // تحقق من URI الصورة المحددة
      } else {
        Alert.alert('No image selected', 'You need to select an image.');
      }
    } catch (error) {
      Alert.alert('Error picking image', error.message);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price || !quantity || !image) {
      Alert.alert('Error', 'Please fill out all fields and select an image.');
      console.log('Name:', name);
      console.log('Price:', price);
      console.log('Quantity:', quantity);
      console.log('Image URI:', image); // تحقق من القيم قبل محاولة إضافة المنتج
      return;
    }

    try {
      const imageName = Date.now().toString();
      const imageRef = ref(storage, `images/${imageName}`);

      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);

      const imageUrl = await getDownloadURL(imageRef);
      console.log('Uploaded image URL:', imageUrl); // تحقق من URL الصورة المرفوعة

      const productRef = doc(firestore, 'products', Date.now().toString());
      await setDoc(productRef, {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        image: imageUrl,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Product added successfully!');
      setName('');
      setPrice('');
      setQuantity('');
      setImage(null);
    } catch (error) {
      Alert.alert('Error', `Failed to add product: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity onPress={handleImagePicker} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>{image ? 'Change Image' : 'Pick Image'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePicker: {
    backgroundColor: '#e1e1e1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#007BFF',
  },
  image: {
    width: 300, // زيادة العرض للصورة
    height: 300, // زيادة الارتفاع للصورة
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Add;
