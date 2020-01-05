import firebase from 'firebase'
require("firebase/firestore");
import "firebase/storage"

// initialize firebase
var firebaseConfig = {
    apiKey: "AIzaSyDaOfBBiJADXEsqmXP3_boa5O0HIqAng3s",
    authDomain: "ishop-8a89f.firebaseapp.com",
    databaseURL: "https://ishop-8a89f.firebaseio.com",
    projectId: "ishop-8a89f",
    storageBucket: "ishop-8a89f.appspot.com",
    messagingSenderId: "740630818414",
    appId: "1:740630818414:web:568431f66014c058"
  };
  // Initialize Firebase
  const  fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export {fb, db};

