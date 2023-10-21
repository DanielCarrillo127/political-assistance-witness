import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyADoCvu4UrzNOymSBOT7SnnxVJU4zwSCS0",
    authDomain: "vote-cdn.firebaseapp.com",
    projectId: "vote-cdn",
    storageBucket: "vote-cdn.appspot.com",
    messagingSenderId: "618018992376",
    appId: "1:618018992376:web:ea5a3681b38d7f20a00b0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)