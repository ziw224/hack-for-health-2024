import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGU3jrgxvjcuTl6zpWw8Z2AYd1SBv1e_U",
    authDomain: "chat-e6d6a.firebaseapp.com",
    projectId: "chat-e6d6a",
    storageBucket: "chat-e6d6a.appspot.com",
    messagingSenderId: "958123746376",
    appId: "1:958123746376:web:f348b86521ee89af92247d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()