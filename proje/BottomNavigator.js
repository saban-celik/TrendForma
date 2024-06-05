import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import Settings from './Settings';
import { useNavigation } from '@react-navigation/native';
import colors from './colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'AnaSayfa') {
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'cogs';
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        headerStyle: {
          backgroundColor: colors.inputBackground,
        },
        headerTintColor: colors.buttonText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="AnaSayfa" 
        component={HomeScreen} 
        options={{
          title: 'Ana Sayfa',
          headerRight: () => (
            <FontAwesome 
              name="shopping-cart" 
              size={24} 
              color={colors.text} 
              style={{ marginRight: 15 }} 
              onPress={() => navigation.navigate('CartScreen')}
            />
          ),
        }} 
      />
      <Tab.Screen name="Settings" component={Settings} options={{ title: 'Ayarlar' }} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
