import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';

const handlePress = () => {
  // رابط صفحة فيسبوك الخاصة بالدعم
  const url = 'https://www.facebook.com/midomom01/'; 
  Linking.openURL(url).catch((err) => console.error('An error occurred', err));
};
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo and App Name */}
      <View style={styles.header}>
        <Image source={require('../assets/mm.jpg')} style={styles.logo} />
        <Text style={styles.appName}>متجر لطفي كيدس</Text>
      </View>

      {/* Header Image or Banner */}
      <Image source={require('../assets/mm.jpg')} style={styles.headerImage} />

      {/* Introduction */}
      <Text style={styles.introText}>
        مرحبا بكم على تطبيقنا لطفي كيدس لبيع الملابس الخاصة بالاطفال ذكور و اناث نوفر لكم خدمات رائعة في متجرنا !
      </Text>

      {/* Quick Navigation Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Dokol')}
        >
          <Text style={styles.buttonText}>تسجيل الدخول </Text>
        </TouchableOpacity>
      { /*  <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Tasjil')}
        >
          <Text style={styles.buttonText}>تسجيل حساب</Text> 
        </TouchableOpacity> */} 
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Buy')}
        >
          <Text style={styles.buttonText}>شراء منتجات </Text>
        </TouchableOpacity>
       
      </View>

      {/* Customer Support Links */}
      <View style={styles.supportLinks}>
      <TouchableOpacity onPress={handlePress}>
          <Text style={styles.linkText}>Contact Support</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>FAQ</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Links */}
      <View style={styles.socialMedia}>
        <TouchableOpacity>
          <Text style={styles.socialMediaLink}>Follow Us on Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.socialMediaLink}>Like Us on Facebook</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.footer}>
        <Text style={styles.footerText}>Created by Mohamed lamine boualleg</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 50,
    width: '100%',
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10, // المسافة بين الأزرار
    width: '80%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  supportLinks: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  linkText: {
    color: '#007BFF',
    marginRight: 10,
  },
  footerText: {
    color: '#007BFF',
    fontSize: 14,
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialMediaLink: {
    color: '#007BFF',
    marginHorizontal: 10,
  },
  

});

export default Home;
