// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDvfXs-2I3aEaO2jeCp8adyVnlOazPzyCY",
    authDomain: "pantry-a6783.firebaseapp.com",
    projectId: "pantry-a6783",
    storageBucket: "pantry-a6783.appspot.com",
    messagingSenderId: "511092628867",
    appId: "1:511092628867:web:7119204ad20d2b6bd26ab6",
    measurementId: "G-KV8KB6R6QP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // User is not signed in, redirect to login page
        window.location.href = "login.html";
    }
});
