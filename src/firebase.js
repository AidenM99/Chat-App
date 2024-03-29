import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZVMliQyxMD-zScpxdZ-VBEBtoJsBVcBU",
  authDomain: "chat-app-4cf40.firebaseapp.com",
  projectId: "chat-app-4cf40",
  storageBucket: "chat-app-4cf40.appspot.com",
  messagingSenderId: "613192483730",
  appId: "1:613192483730:web:0e229bcd8ebdb1cfee374b",
  measurementId: "G-Y1EHHLQPJN",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { db, provider };
