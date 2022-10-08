import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.API_KEY_REACT,
    authDomain: "my-projects-2525.firebaseapp.com",
  projectId: "my-projects-2525",
  storageBucket: "my-projects-2525.appspot.com",
  messagingSenderId: "951108535534",
    appId: process.env.API_KEY_ID,
    measurementId: "G-1B6LPJFHD4"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig)

  const db=firebaseApp.firestore()

  export default db;