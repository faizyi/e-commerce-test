import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCAHrh6segeM6dgjY26lKfU2B58D-PCVWQ",
  authDomain: "yumyard-e-commerce.firebaseapp.com",
  databaseURL: "https://yumyard-e-commerce-default-rtdb.firebaseio.com",
  projectId: "yumyard-e-commerce",
  storageBucket: "yumyard-e-commerce.appspot.com",
  messagingSenderId: "1046575436430",
  appId: "1:1046575436430:web:9c00390cdd42330ef72fdf",
  measurementId: "G-29D2YKQQDT"
  };
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app)