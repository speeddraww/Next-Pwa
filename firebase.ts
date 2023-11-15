import { getApp,getApps,initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need






// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBN2u4Y14fobPVwTGOA5735o3wSxL7e3vY",

  authDomain: "chatgpt-4d036.firebaseapp.com",

  projectId: "chatgpt-4d036",

  storageBucket: "chatgpt-4d036.appspot.com",

  messagingSenderId: "553788997539",

  appId: "1:553788997539:web:b2d8ad350f6e607b2f2416"

};
const apps = getApps().length ? getApps() : initializeApp(firebaseConfig);


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};