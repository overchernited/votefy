// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA5bJqw1DstXKyzB_J2dzQYw5UCMs0lU4w",
    authDomain: "ivotifie.firebaseapp.com",
    projectId: "ivotifie",
    storageBucket: "ivotifie.firebasestorage.app",
    messagingSenderId: "226410124824",
    appId: "1:226410124824:web:84976c6ec0ee8d9cfe156d"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence);

export { auth, db, storage };
