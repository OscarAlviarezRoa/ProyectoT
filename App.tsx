import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CustomCard } from './components/CustomCard/CustomCard';
import { Cards } from './constants';

// navigatior

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import LoginScreen from './screens/LoginScreen';
import DetailScreen from "./screens/DetailScreen";
import DeviceScreen from "./screens/DeviceScreen";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{statusBarColor:"#7ACFFF", title:"Inicio",headerStyle:{backgroundColor:"#7ACFFF"},
        headerTintColor: "#fff",
        headerTitleAlign:"center",
        }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{statusBarColor:"#7ACFFF", title:"Detalles",headerStyle:{backgroundColor:"#7ACFFF"},
        headerTintColor: "#fff",
        headerTitleAlign:"center",
        }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{statusBarColor:"#7ACFFF", title:"Login",headerStyle:{backgroundColor:"#7ACFFF"},
        headerTintColor: "#fff",
        headerTitleAlign:"center",
        }}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{statusBarColor:"#7ACFFF", title:"Login",headerStyle:{backgroundColor:"#7ACFFF"},
          headerTintColor: "#fff",
          headerTitleAlign:"center",
        }}/>
        <Stack.Screen name="Device" component={DeviceScreen} options={{statusBarColor:"#7ACFFF", title:"Login",headerStyle:{backgroundColor:"#7ACFFF"},
          headerTintColor: "#fff",
          headerTitleAlign:"center",
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



