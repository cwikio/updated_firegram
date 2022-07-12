
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC7rAbp4_SIRik17VeNX0dh6mF3UX-EVKo",
    authDomain: "firegram-gallery-f2aba.firebaseapp.com",
    projectId: "firegram-gallery-f2aba",
    storageBucket: "firegram-gallery-f2aba.appspot.com",
    messagingSenderId: "181820760747",
    appId: "1:181820760747:web:3a8105aebc35bfdbfa0dee"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);