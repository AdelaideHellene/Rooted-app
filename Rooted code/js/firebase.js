import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyB2sfH1cQv6H8LCKzbUawhQg_itA071lQU",
    authDomain: "rooted-4b15b.firebaseapp.com",
    projectId: "rooted-4b15b",
    storageBucket: "rooted-4b15b.firebasestorage.app",
    messagingSenderId: "983787619185",
    appId: "1:983787619185:web:ede50dc4bea9d97527acd0"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export { app, db };