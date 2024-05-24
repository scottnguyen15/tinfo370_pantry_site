// Firebase import stuff

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDvfXs-2I3aEaO2jeCp8adyVnlOazPzyCY",
    authDomain: "pantry-a6783.firebaseapp.com",
    projectId: "pantry-a6783",
    storageBucket: "pantry-a6783.appspot.com",
    messagingSenderId: "511092628867",
    appId: "1:511092628867:web:7119204ad20d2b6bd26ab6",
    measurementId: "G-KV8KB6R6QP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to handle form submission
const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const itemWeight = document.getElementById("item-weight").value;
    const numOfFoods = document.getElementById("num-of-foods").value;
    const numOfToiletries = document.getElementById("num-of-toiletries").value;
    const source = document.querySelector('input[name="source"]:checked').value;

    try {
        // Add data to Firestore collection
        const docRef = await addDoc(collection(db, "Check-Out"), {
            itemWeight: parseFloat(itemWeight),
            numOfFoods: parseInt(numOfFoods),
            numOfToiletries: parseInt(numOfToiletries),
            source: source,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);

        // Reset form after successful submission
        event.target.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

// Attach submit event listener to the form
document.querySelector("form").addEventListener("submit", handleSubmit);
