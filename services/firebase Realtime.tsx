import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  apiKey: "AIzaSyA2ct78eu3ekUJqhdH5chYn_O4M6aYNHTM",
  authDomain: "proyecto-titulo-3.firebaseapp.com",
  databaseURL: "https://proyecto-titulo-3-default-rtdb.firebaseio.com",
  projectId: "proyecto-titulo-3",
  storageBucket: "proyecto-titulo-3.appspot.com",
  messagingSenderId: "1006768301538",
  appId: "1:1006768301538:web:cf5bea6d9f4644ab60c5bb",
  measurementId: "G-LEEEJVXBSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
export const database2 = getDatabase(app);

