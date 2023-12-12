import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxXHlgJ7WL2scTt6vgsICiuWs-_biIdI8",
  authDomain: "todo-nextjs-db35e.firebaseapp.com",
  projectId: "todo-nextjs-db35e",
  storageBucket: "todo-nextjs-db35e.appspot.com",
  messagingSenderId: "515393299355",
  appId: "1:515393299355:web:9dbeaa938bfbbd7919b73e",
  measurementId: "G-R9890KCEPT",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
