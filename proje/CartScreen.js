import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ route }) => {
    const { cartItems: initialCartItems } = route.params;
    const [cartItems, setCartItems] = useState(initialCartItems);
    const navigation = useNavigation();

    const handlechange = () => {
        if (cartItems.length === 0) {
            alert('Sepetiniz boş!');
        } else {
            alert('Siparişiniz alındı!');
            navigation.navigate('anaSayfa'); // Anasayfaya yönlendirme
        }
    }

    const handleSepetChange = () => {
        if (cartItems.length !== 0) {
            // Doğrudan cartItems durumunu boş bir diziyle güncelleyin
            setCartItems([]);
            alert('Sepetiniz başarıyla boşaltıldı!');
        }
    }

    return (
        <ImageBackground source={require('./kargoo.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.text}>Sepetteki Ürünler:</Text>
                <View style={styles.sepet}>
                    {cartItems.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                            <Text style={{ marginRight: 10 }}>{item.name}</Text>
                            <Text>({item.team})</Text>
                            <Text style={{ marginLeft: 10 }}>{item.price} TL</Text>
                            
                        </View>
                    ))}
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.handlechange} onPress={handlechange}>
                        <Text style={styles.buttonText}>Sipariş Ver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.handleSepetChange} onPress={handleSepetChange}>
                        <Text style={styles.buttonText}>Sepeti Sil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sepet: {
        borderWidth: 1, padding: 10, borderRadius: 5, backgroundColor: 'transparent'
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
        color: 'yellow'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    background: {
        width: '100%', // Resmin genişliğini bileşenin genişliği kadar ayarlar
        height: '100%', // Resmin yüksekliğini bileşenin yüksekliği kadar ayarlar
        resizeMode: 'cover', // Resmi bileşenin boyutlarına sığacak şekilde doldurur
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around', // İki butonu eşit aralıklarla konumlandırmak için
        marginVertical: 10,
    },
    handlechange: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    handleSepetChange: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
});

export default CartScreen;
