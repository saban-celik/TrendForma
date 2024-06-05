import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './firebase';
import colors from './colors'; 

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('a@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Yeni kullanıcı başarıyla kaydedildi.');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Kullanıcı mevcut.');
        }
      });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('BottomNavigator');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          alert('Geçerli bir e-posta adresi giriniz.');
        } else if (error.code === 'auth/user-not-found') {
          alert('Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.');
        } else if (error.code === 'auth/invalid-credential') {
          alert('Girilen kimlik bilgileri geçersiz.');
        }
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./trendyol.jpg')} style={styles.imageBackground} imageStyle={{ borderRadius: 10 }} resizeMode='cover'>
        <View style={styles.overlay} />
      </ImageBackground>
      <Text style={styles.logo}>TrendForma</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
          <Text style={styles.registerText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotBtn} onPress={() => navigation.navigate('Remember')}>
          <Text style={styles.forgotText}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  imageBackground: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 35,
    color: colors.primary,
    marginBottom: 10, 
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputView: {
    width: '100%',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    height: 50,
    marginBottom: 10, 
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    color: 'white',
    padding: 0, 
  },
  forgotBtn: {
    marginTop: 10,
  },
  forgotText: {
    color: colors.link,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: colors.buttonBackground,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, 
  },
  loginText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerBtn: {
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
