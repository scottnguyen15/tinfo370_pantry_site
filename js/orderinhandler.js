import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);

// Function to handle form submission
const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Get form values
    const itemWeight = document.getElementById('item-weight').value;
    const itemReceived = document.getElementById('item-received').value;
    const source = document.querySelector('input[name="source"]:checked').value;
    
    // Create a new document in the "orders" collection
    try {
        await addDoc(collection(db, "orders"), {
            itemWeight: parseFloat(itemWeight),
            itemReceived: parseInt(itemReceived),
            source: source,
            timestamp: serverTimestamp() // Server timestamp
        });
        console.log("Order submitted successfully!");
        // You can add any success message or redirect user to another page here
    } catch (error) {
        console.error("Error adding document: ", error);
        // Handle error here
    }
};

// Add event listener to the form for form submission
document.querySelector('form').addEventListener('submit', handleFormSubmit);
