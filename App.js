import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Remember from './proje/Remember';
import AnaSayfa from './proje/anaSayfa';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './proje/firebase';
import CartScreen from './proje/CartScreen';

import Settings from './proje/Settings';





//Drawer navigation  eklemyi unutma

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen name="Remember" component={Remember} />
          <Stack.Screen name='anaSayfa' component={AnaSayfa} />
          <Stack.Screen name='CartScreen' component={CartScreen} />
          <Stack.Screen name='Settings' component={Settings} />
          


        </Stack.Navigator>
      </NavigationContainer>
    
  );
};


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Kullanıcı başarıyla oluşturulduğunda gerçekleşecek işlemler
        const user = userCredential.user;

        alert('Yeni kullanıcı başarıyla kaydedildi.');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        // Hata durumunda gerçekleşecek işlemler


        if (error.code == 'auth/email-already-in-use') {
          alert('kullanıcı mevcut.')
        }

      });
  }

  const handlelogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Kullanıcı başarıyla oluşturulduğunda gerçekleşecek işlemler
        const user = userCredential.user;

        navigation.navigate('anaSayfa')
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.error('Hata:', error);
        if (error.code === 'auth/invalid-email') {
          alert('Geçerli bir e-posta adresi giriniz.');
        } else if (error.code === 'auth/user-not-found') {
          alert('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.');
        } else if (error.code == 'auth/invalid-credential') {
          alert('girilen kimlik bilgileri gecersiz.');
        }
      });


  }

  return (
    <ImageBackground source={require('./proje/trendyol.jpg')} style={styles.background} resizeMode='stretch'>
      <View style={styles.container}>
        <Text style={styles.logo}>Hoş geldiniz</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handlelogin}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
          <Text style={styles.registerText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotBtn} onPress={() => navigation.navigate('Remember')}>
          <Text style={styles.forgotText}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'black',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    color: 'white',
  },
  forgotBtn: {
    marginTop: 10,
  },
  forgotText: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  registerBtn: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: 'white',
  },
});

export default MyStack;
