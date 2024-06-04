import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';




// Ürünler ve fotoğrafların eşleştirildiği bir nesne
const productsWithImages = {
    "Beşiktaş": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/beşiktaş/bjk.webp'), price: 100 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/beşiktaş/bjkşort.jpeg'), price: 50 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/beşiktaş/bjkatkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/beşiktaş/bjkkrampon.jpeg'), price: 80 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/beşiktaş/bjkbileklik.jpeg'), price: 20 }
    },
    "Fenerbahçe": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/fenerbahçe/fbforma.jpeg'), price: 120 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/fenerbahçe/fbsort.jpeg'), price: 60 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/fenerbahçe/fbatkı.jpeg'), price: 40 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/fenerbahçe/fbkrampon.jpeg'), price: 90 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/fenerbahçe/fbbileklik.png'), price: 25 }
    },
    "Galatasaray": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/galatasaray/gsforma.jpeg'), price: 110 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/galatasaray/gssort.jpeg'), price: 55 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/galatasaray/gsatkı.jpeg'), price: 35 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/galatasaray/gskrampon.jpeg'), price: 85 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/galatasaray/gsbileklik.jpeg'), price: 30 }
    },
    "Trabzonspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/trabzon/tsforma.jpeg'), price: 5000 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/trabzon/tssort.jpeg'), price: 50 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/trabzon/tsatkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/trabzon/tskrampon.jpeg'), price: 80 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/trabzon/tsbileklik.jpeg'), price: 20 }
    },
    "Antalyaspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/antalya/anforma.jpeg'), price: 90 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/antalya/ansort.jpeg'), price: 45 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/antalya/anatkı.jpeg'), price: 25 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/antalya/ankrampon.jpeg'), price: 70 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/antalya/anbileklik.jpeg'), price: 15 }
    },
    "Göztepe": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/göztepe/gtforma.jpeg'), price: 95 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/göztepe/gtsort.jpeg'), price: 50 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/göztepe/gtatkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/göztepe/gtkrampon.jpeg'), price: 75 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/göztepe/gtbileklik.jpeg'), price: 20 }
    },
    "Konyaspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/konya/ksforma.jpeg'), price: 85 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/konya/kssort.jpeg'), price: 45 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/konya/ksatkı.jpeg'), price: 20 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/konya/kskrampon.jpeg'), price: 70 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/konya/ksbileklik.jpeg'), price: 15 }
    },
    "Alanyaspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/alanya/asforma.jpeg'), price: 80 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/alanya/asshort.jpeg'), price: 40 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/alanya/asatkı.jpeg'), price: 25 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/alanya/askrampon.jpeg'), price: 65 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/alanya/asbileklik.jpeg'), price: 18 }
    },
    "Gaziantep Belediye FK": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/gaziantep/gaforma.jpeg'), price: 90 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/gaziantep/gasort.jpeg'), price: 45 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/gaziantep/gaatkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/gaziantep/gakrampon.jpeg'), price: 75 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/gaziantep/gabileklik.jpeg'), price: 20 }
    },
    "Hatayspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/hatay/hforma.jpeg'), price: 85 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/hatay/hsort.jpeg'), price: 40 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/hatay/hatkı.jpeg'), price: 25 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/hatay/hkrampon.jpeg'), price: 70 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/hatay/hbileklik.jpeg'), price: 20 }
    },
    "İstanbul Başakşehir": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/istanbul başakşehir/ibforma.jpeg'), price: 90 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/istanbul başakşehir/ibsort.jpeg'), price: 45 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/istanbul başakşehir/ibatkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/istanbul başakşehir/ibkrampon.jpeg'), price: 80 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/istanbul başakşehir/ibbileklik.jpeg'), price: 25 }
    },
    "Kayserispor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/kayseri/kforma.jpeg'), price: 80 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/kayseri/ksort.jpeg'), price: 40 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/kayseri/katkı.jpeg'), price: 20 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/kayseri/kkrampon.jpeg'), price: 70 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/kayseri/kbileklik.jpeg'), price: 15 }
    },
    "Kasımpaşa": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/kasımpaşa/kpforma.jpeg'), price: 85 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/kasımpaşa/kpsort.jpeg'), price: 45 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/kasımpaşa/kpatkı.jpeg'), price: 25 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/kasımpaşa/kpkrampon.jpeg'), price: 75 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/kasımpaşa/kpbileklik.jpeg'), price: 20 }
    },
    "Karagümrük": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/karagümrük/kgforma.jpeg'), price: 95 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/karagümrük/kgsort.jpeg'), price: 50 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/karagümrük/kgatkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/karagümrük/kgkrampon.jpeg'), price: 75 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/karagümrük/kgbileklik.jpeg'), price: 20 }
    },
    "Malatyaspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/malatya/mforma.jpeg'), price: 80 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/malatya/msort.jpeg'), price: 40 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/malatya/matkı.png'), price: 20 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/malatya/mkrampon.jpeg'), price: 75 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/malatya/mbileklik.jpeg'), price: 15 }
    },
    "Rizespor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/rize/rsforma.jpeg'), price: 85 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/rize/rssort.jpeg'), price: 45 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/rize/rsatkı.jpeg'), price: 25 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/rize/rskrampon.jpeg'), price: 70 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/rize/rsbileklik.jpeg'), price: 20 }
    },
    "Sivasspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/sivas/sforma.jpeg'), price: 90 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/sivas/ssort.jpeg'), price: 50 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/sivas/satkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/sivas/skrampon.jpeg'), price: 80 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/sivas/sbileklik.jpeg'), price: 25 }
    },
    "Samsunspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/samsunspor/ssforma.jpeg'), price: 80 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/samsunspor/sssort.jpeg'), price: 40 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/samsunspor/ssatkı.png'), price: 20 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/samsunspor/sskrampon.jpeg'), price: 70 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/samsunspor/ssbileklik.jpeg'), price: 15 }
    },
    "Amedspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/amedspor/asforma.jpeg'), price: 85 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/amedspor/assort.jpeg'), price: 45 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/amedspor/asatkı.jpeg'), price: 25 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/amedspor/askrampon.jpeg'), price: 70 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/amedspor/asbileklik.jpeg'), price: 20 }
    },
    "Adana Demirspor": {
        "Forma": { image: require('../src/turkiyefoto/projefotoları/adanademir/adforma.jpeg'), price: 90 },
        "Şort": { image: require('../src/turkiyefoto/projefotoları/adanademir/adsort.jpeg'), price: 50 },
        "Atkı": { image: require('../src/turkiyefoto/projefotoları/adanademir/adatkı.jpeg'), price: 30 },
        "Krampon": { image: require('../src/turkiyefoto/projefotoları/adanademir/adkrampon.jpeg'), price: 75 },
        "Bileklik": { image: require('../src/turkiyefoto/projefotoları/adanademir/adbileklik.jpeg'), price: 20 }
    },

    // Diğer takımların ürün fotoğrafları buraya eklenebilir
};





// Ülkeler ve takımlar
const countriesAndTeams = {
    "Türkiye": ["Beşiktaş", "Fenerbahçe", "Galatasaray", "Trabzonspor", "Antalyaspor", "Göztepe", "Konyaspor", "Alanyaspor", "Gaziantep FK", "Hatayspor", "İstanbul Başakşehir", "Kayserispor", "Kasımpaşa", "Karagümrük", "Malatyaspor", "Rizespor", "Sivasspor", "Samsunspor", "Amedspor", "Adana Demirspor"],
    // Diğer ülkeler ve takımlar buraya eklenebilir
};

// Her ürün için fotoğraf ve ürün adını içeren bir nesne oluşturuyoruz
const generateProducts = (team) => {
    const teamProducts = productsWithImages[team];
    if (!teamProducts) {
        return []; // Takım ürünleri tanımlı değilse, boş dizi döndür
    }
    const products = Object.keys(teamProducts).map((productName, index) => {
        return { 
            name: productName, 
            image: teamProducts[productName].image, 
            price: teamProducts[productName].price, // Fiyatı da ekleyin
            team: team, 
            id: index 
        };
    });
    return products;
};





// Ülkeler ve takımların ürünlerle eşleştirilmesi
const productsAndTeams = {};

Object.keys(countriesAndTeams).map(country => {
    const teams = countriesAndTeams[country];
    teams.map(team => {
        return productsAndTeams[team] = generateProducts(team);
    });
});


const Tab = createBottomTabNavigator();





export default function AnaSayfa() {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);


    const navigation = useNavigation();


    const goToCard = () => {
        navigation.navigate('CartScreen', {  cartItems });

    }
    const goToSettings =()=>{
        navigation.navigate('Settings')
    }

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
    const addToCart = (product) => {
        
        console.log("Sepete eklenecek ürünün fiyatı:", product.price);
        setCartItems(prevItems => [...prevItems, product]);
    };
    
    const deleteFromCart = (product) => {
        console.log("Sepetten çıkarılacak ürünün fiyatı:", product.price);
        setCartItems(prevItems => prevItems.filter(item => item !== product));
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
                                <Text>{product.name}</Text>
                                <Text> {product.price} TL</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => addToCart(product)} style={styles.addButton}>
                                        <Text>Sepete Ekle</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteFromCart(product)} style={styles.deleteButton}>
                                        <Text>Sepetten Çıkar</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        ))}

                    </View>
                }
                {/* <NavigationBar onPress={() => console.log("Sepete git butonuna tıklandı")} /> */}
            </ScrollView>

            <View style={styles.buttonContainerr}>
            <View style={styles.buttonContainer}>
    <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={goToCard}>
        <Text style={styles.buttonText}>Sepete Git</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={goToSettings}>
        <Text style={styles.buttonText}>Ayarlar</Text>
    </TouchableOpacity>
</View>

            </View>


            <View style={styles.buttonContainer}>

            </View>
                

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'grey',
    },
    button: {
        backgroundColor: '#6495ED', // Mavi renk
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    scrollView: {
        backgroundColor: '#ffffff',
        marginHorizontal: 0,
    },
    pickerContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#FFA500', // Turuncu
        borderRadius: 5,
    },
    productContainer: {
        marginTop: 20,
    },
    productHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FFA500', // Turuncu
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    buttonContainerr: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF', // Beyaz renk
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#32CD32', // Lime yeşili
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#FF4500', // Parlak turuncu
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    


});
