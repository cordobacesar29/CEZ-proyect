// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9SiZsf9lNIEKmRdaSFV2_DX6XaVp9RbY",
  authDomain: "reclamos-cez.firebaseapp.com",
  projectId: "reclamos-cez",
  storageBucket: "reclamos-cez.appspot.com",
  messagingSenderId: "1051237367045",
  appId: "1:1051237367045:web:2bbc7231b615710bbf0b6c",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)