import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './colors';

const Settings = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState('light');

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const logout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Gerçekten çıkış yapmak istiyor musunuz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            navigation.replace('LoginScreen');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={[styles.container, theme === 'dark' && styles.darkTheme]}>
      <View style={styles.header}>
        <Icon name="cogs" size={30} color={colors.primary} style={styles.icon} />
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkThemeText]}>Hesap Ayarları</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, theme === 'dark' && styles.darkThemeText]}>Profil Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, theme === 'dark' && styles.darkThemeText]}>Şifre Değiştir</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, theme === 'dark' && styles.darkThemeText]}>Uygulama Ayarları</Text>
        <TouchableOpacity style={styles.item} onPress={handleThemeChange}>
          <Text style={[styles.itemText, theme === 'dark' && styles.darkThemeText]}>Tema Seçimi: {theme === 'light' ? 'Açık' : 'Koyu'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={[styles.itemText, theme === 'dark' && styles.darkThemeText]}>Bildirim Ayarları</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.item, styles.logoutButton]} onPress={logout}>
        <Text style={[styles.itemText, styles.logoutText]}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  darkTheme: {
    backgroundColor: '#121212',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    marginTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.inputBackground,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
  },
  darkThemeText: {
    color: '#fff',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: colors.buttonBackground,
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    color: colors.buttonText,
    fontWeight: 'bold',
  },
});

export default Settings;
