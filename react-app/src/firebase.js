import firebase from 'firebase/app';
import 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDa8p-_oLGFp15segwFgq2CGAzFHX1j1_k',
  authDomain: 'my-ecom-calc.firebaseapp.com',
  databaseURL: 'https://my-ecom-calc.firebaseio.com',
  projectId: 'my-ecom-calc',
  storageBucket: 'my-ecom-calc.appspot.com',
  messagingSenderId: '396043032363',
  appId: '1:396043032363:web:4d6e1c4d43302c8251d76e'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const fs = firebase.firestore();
