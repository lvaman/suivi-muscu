import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot, updateDoc, arrayUnion, collection, query, where, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDPCMCi4BB2dySCc8G4adLYQXJSk-903v0",
    authDomain: "weddingchart.firebaseapp.com",
    projectId: "weddingchart",
    storageBucket: "weddingchart.firebasestorage.app",
    messagingSenderId: "345074315998",
    appId: "1:345074315998:web:ae600053bcbe04a977884f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db,
    doc,
    setDoc,
    onSnapshot,
    updateDoc,
    arrayUnion,
    collection,
    query,
    where,
    getDocs,
    deleteDoc
};
