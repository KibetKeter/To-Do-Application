  import firebase from 'firebase';
  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyB6sYpa5XsmvqMSJTWytxofqqGvlY4Cr-Y",
    authDomain: "todo-app-cp-e907e.firebaseapp.com",
    databaseURL: "https://todo-app-cp-e907e.firebaseio.com",
    projectId: "todo-app-cp-e907e",
    storageBucket: "todo-app-cp-e907e.appspot.com",
    messagingSenderId: "98678334567",
    appId: "1:98678334567:web:5f4ed9b99d5c8306b3a0c2",
    measurementId: "G-0MEL54SFPJ"
  });
const db=firebaseApp.firestore();
export default db;