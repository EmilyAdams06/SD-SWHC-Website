// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from 'firebase/auth';

//import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
    apiKey: "AIzaSyCw_bUWIBcoZ42BKCAScJOfO2q2KyThJ9U",
    authDomain: "git-wh.firebaseapp.com",
    databaseURL: "https://git-wh-default-rtdb.firebaseio.com",
    projectId: "git-wh",
    storageBucket: "git-wh.appspot.com",
    messagingSenderId: "200839480102",
    appId: "1:200839480102:web:0caa9e93cf67f1e5ad37e7",
    measurementId: "G-8VD9FRSSSL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in:', error);
  });

export { database, auth };