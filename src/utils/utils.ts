// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe3n0Pj6R8QmjDUiKDsGS1XRBFQWR_NY8",
  authDomain: "wordie-d653d.firebaseapp.com",
  databaseURL:
    "https://wordie-d653d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wordie-d653d",
  storageBucket: "wordie-d653d.appspot.com",
  messagingSenderId: "27137720014",
  appId: "1:27137720014:web:d4af5d7f3221bcf60fda9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
