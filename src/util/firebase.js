import firebase from "firebase";
import { API_KEY } from "./api";
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "ethcrowd-f9bdd.firebaseapp.com",
  projectId: "ethcrowd-f9bdd",
  storageBucket: "ethcrowd-f9bdd.appspot.com",
  messagingSenderId: "659500728423",
  appId: "1:659500728423:web:56dd4cd1ccf0b1b5b214c2",
  measurementId: "G-KHSTT68JPG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
