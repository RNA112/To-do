// Configuração e inicialização centralizada do Firebase Firestore (SDK v13.4.0 via CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiyyuBgtBoZCK6zqubNmBNdaKxZ1GNUfA",
  authDomain: "to-do-dc526.firebaseapp.com",
  projectId: "to-do-dc526",
  storageBucket: "to-do-dc526.firebasestorage.app",
  messagingSenderId: "1056982053866",
  appId: "1:1056982053866:web:f0e0f4daf014588bac7893"
};

// Inicialização Singleton
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
};
