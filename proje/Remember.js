import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from './firebase'; // Firebase auth modülünü import edin

const Remember = () => {
  const [email, setEmail] = useState('');
  const [resetRequested, setResetRequested] = useState(false);
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email); // auth nesnesi üzerinden sendPasswordResetEmail fonksiyonunu çağırın
      setResetRequested(true);
      setError(null);
    } catch (error) {
      console.error('Şifre sıfırlama isteği gönderilirken bir hata oluştu:', error);
      setError('Şifre sıfırlama isteği gönderilirken bir hata oluştu');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifremi Unuttum</Text>
      {resetRequested ? (
        <Text style={styles.info}>Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.</Text>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="E-posta adresinizi girin"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Şifremi Sıfırla</Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
});

export default Remember;
