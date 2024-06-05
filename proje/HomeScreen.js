import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { db } from './firebase';  
import { collection, addDoc, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { productsWithImages, countriesAndTeams } from './data';
import colors from './colors';


const generateProducts = (team) => {
  const teamProducts = productsWithImages[team];
  if (!teamProducts) {
    return [];
  }
  const products = Object.keys(teamProducts).map((productName, index) => {
    return { 
      name: productName, 
      image: teamProducts[productName].image, 
      price: teamProducts[productName].price, 
      team: team, 
      quantity: 1,
      id: index 
    };
  });
  return products;
};

const productsAndTeams = {};

Object.keys(countriesAndTeams).map(country => {
  const teams = countriesAndTeams[country];
  teams.map(team => {
    return productsAndTeams[team] = generateProducts(team);
  });
});

function AnaSayfa() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigation = useNavigation();

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedTeam(null);
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
  };

  useEffect(() => {
    if (selectedTeam && productsAndTeams[selectedTeam]) {
      setSelectedProducts(productsAndTeams[selectedTeam]);
    } else {
      setSelectedProducts([]);
    }
  }, [selectedTeam]);

  const addToCart = async (product) => {
    console.log("Sepete eklenecek ürünün fiyatı:", product.price);
    try {
      const cartItemRef = collection(db, 'cartItems');
      const q = query(cartItemRef, where('name', '==', product.name), where('team', '==', product.team));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const cartItem = querySnapshot.docs[0];
        const updatedQuantity = cartItem.data().quantity + 1;
        await updateDoc(doc(db, 'cartItems', cartItem.id), { quantity: updatedQuantity });
      } else {
        await addDoc(collection(db, 'cartItems'), product);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={handleCountryChange}>
            <Picker.Item label="Ülke Seçiniz" value={null} />
            {Object.keys(countriesAndTeams).map((country) => (
              <Picker.Item label={country} value={country} key={country} />
            ))}
          </Picker>
        </View>
        {selectedCountry &&
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTeam}
              onValueChange={handleTeamChange}>
              <Picker.Item label="Takım Seçiniz" value={null} />
              {countriesAndTeams[selectedCountry].map((team) => (
                <Picker.Item label={team} value={team} key={team} />
              ))}
            </Picker>
          </View>
        }
        {selectedTeam &&
          <View style={styles.productContainer}>
            <Text style={styles.productHeader}> Takımın Ürünleri:</Text>
            {selectedProducts.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price} TL</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => addToCart(product)} style={styles.addButton}>
                    <Text style={styles.buttonText}>Sepete Ekle</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    backgroundColor: colors.background,
    marginHorizontal: 0,
  },
  pickerContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
  },
  productContainer: {
    marginTop: 20,
  },
  productHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  productPrice: {
    fontSize: 14,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: colors.buttonBackground, 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.buttonText, 
    fontWeight: 'bold',
  },
});
export default AnaSayfa;
