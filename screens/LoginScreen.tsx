import * as React from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//login
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { firebaseConfig } from '../services/firebase';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const app = initializeApp(firebaseConfig);
    // const auth = initializeAuth(app, {
    //     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    //   });
    const auth = getAuth(app)

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log('Account created!')
            const user = userCredential.user;
            console.log(user)
        })
        .catch(error=> {
            console.log(error)
            Alert.alert(error)
        })}
        const handleSignIn = () => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                console.log('signed in!')
                const user = userCredential.user;
                console.log(user)
            })
            .catch(error=> {
                console.log(error)
                Alert.alert(error)
            })


        }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen holax2</Text>

      <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="user"/>
      <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="contraseña"/>
      <Button 
          title="Bienvenido"
          onPress={() => navigation.navigate('Details')}
          color="#F87171"
  
        />
        <Button 
          title="login"
          onPress={handleSignIn}
          color="#F87171"
  
        />
        <Button 
          title="create account"
          onPress={handleCreateAccount}
          color="#F87171"
  
        />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    input: {
      height: 10,
      margin: 6,
      borderWidth: 1,
      padding: 5,
    },
  });
export default LoginScreen;