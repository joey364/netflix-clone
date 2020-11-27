import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDlUfvK2q51wfpn7bIL2TF14rf5ZxDbRfQ',
  authDomain: 'netflix-clone-4caa6.firebaseapp.com',
  databaseURL: 'https://netflix-clone-4caa6.firebaseio.com',
  projectId: 'netflix-clone-4caa6',
  storageBucket: 'netflix-clone-4caa6.appspot.com',
  messagingSenderId: '154053434488',
  appId: '1:154053434488:web:2026c491662d83dfb0e18d',
  measurementId: 'G-1ZNH5PL90T',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};

export const signOut = async () => await auth.signOut();
