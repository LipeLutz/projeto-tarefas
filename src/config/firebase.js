import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCfFlTCNP4GnpW5ebHbjNpcm7zzQUCNrOA",
  authDomain: "projeto-tarefas-ti.firebaseapp.com",
  projectId: "projeto-tarefas-ti",
  storageBucket: "projeto-tarefas-ti.firebasestorage.app",
  messagingSenderId: "1002564131625",
  appId: "1:1002564131625:web:41c9038268527687857538"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)