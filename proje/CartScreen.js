import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from './firebase';  
import { collection, getDocs, deleteDoc, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import colors from './colors';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCartItems = async () => {
            const querySnapshot = await getDocs(collection(db, 'cartItems'));
            const items = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCartItems(items);
        };

        fetchCartItems();
    }, []);

    const handleOrder = () => {
        if (cartItems.length === 0) {
            alert('Sepetiniz boş!');
        } else {
            alert('Siparişiniz alındı!');
            navigation.navigate('AnaSayfa'); // Anasayfaya yönlendirme
        }
    };

    const handleClearCart = async () => {
        if (cartItems.length !== 0) {
            const batch = writeBatch(db);
            cartItems.forEach(item => {
                const itemRef = doc(db, 'cartItems', item.id);
                batch.delete(itemRef);
            });
            await batch.commit();
            setCartItems([]);
            alert('Sepetiniz başarıyla boşaltıldı!');
        }
    };

    const incrementQuantity = async (item) => {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        await updateDoc(doc(db, 'cartItems', item.id), { quantity: updatedItem.quantity });
        setCartItems(prevItems => 
            prevItems.map(i => i.id === item.id ? updatedItem : i)
        );
    };

    const decrementQuantity = async (item) => {
        if (item.quantity > 1) {
            const updatedItem = { ...item, quantity: item.quantity - 1 };
            await updateDoc(doc(db, 'cartItems', item.id), { quantity: updatedItem.quantity });
            setCartItems(prevItems => 
                prevItems.map(i => i.id === item.id ? updatedItem : i)
            );
        } else {
            await deleteFromCart(item);
        }
    };

    const deleteFromCart = async (item) => {
        try {
            await deleteDoc(doc(db, 'cartItems', item.id));
            setCartItems(prevItems => prevItems.filter(i => i.id !== item.id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} TL</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(item)}>
                    <FontAwesome name="minus" size={20} color="red" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => incrementQuantity(item)}>
                    <FontAwesome name="plus" size={20} color="green" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => deleteFromCart(item)}>
                <FontAwesome name="trash" size={20} color="black" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./kargoo.jpg')} style={styles.background}>
                <Text style={styles.text}>Sepetteki Ürünler:</Text>
            </ImageBackground>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
            />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.handleOrder} onPress={handleOrder}>
                    <Text style={styles.buttonText}>Sipariş Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.handleClearCart} onPress={handleClearCart}>
                    <Text style={styles.buttonText}>Sepeti Sil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
        color: colors.text,
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%'
    },
    flatListContent: {
        paddingBottom: 20,
        paddingTop: 10,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.buttonText,
    },
    productPrice: {
        fontSize: 14,
        color: colors.text,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: colors.text,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    handleOrder: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    handleClearCart: {
        backgroundColor: colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: colors.buttonText,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    background: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});

export default CartScreen;
