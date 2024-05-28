import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const auth = getAuth(app);

let isFormSubmitted = false;  // Flag to track form submission

// Function to validate form inputs
const validateFormInputs = () => {
    const itemWeight = document.getElementById("item-weight").value;
    const numOfFoods = document.getElementById("num-of-foods").value;
    const numOfToiletries = document.getElementById("num-of-toiletries").value;

    if (isNaN(itemWeight) || itemWeight === '') {
        alert('Please enter a valid number for the item weight.');
        return false;
    }

    if (isNaN(numOfFoods) || numOfFoods === '') {
        alert('Please enter a valid number for the number of foods.');
        return false;
    }

    if (isNaN(numOfToiletries) || numOfToiletries === '') {
        alert('Please enter a valid number for the number of toiletries.');
        return false;
    }

    return true;
};

// Function to handle form submission
const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Reset the form submission flag
    isFormSubmitted = false;

    // Validate form inputs
    if (!validateFormInputs()) {
        return;
    }

    // Get form values
    const itemWeight = parseFloat(document.getElementById("item-weight").value);
    const numOfFoods = parseInt(document.getElementById("num-of-foods").value);
    const numOfToiletries = parseInt(document.getElementById("num-of-toiletries").value);
    const source = document.querySelector('input[name="source"]:checked').value;

    try {
        // Add data to Firestore collection
        const docRef = await addDoc(collection(db, "checkout"), {
            itemWeight: itemWeight,
            numOfFoods: numOfFoods,
            numOfToiletries: numOfToiletries,
            source: source,
            timestamp: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);

        // Set the form submission flag to true only after a successful submission
        isFormSubmitted = true;

        // Display submission message
        alert('Form submitted successfully! Document ID: ' + docRef.id);

        // Reset form after successful submission
        event.target.reset();

        // Refresh the page after the alert is closed
        window.location.reload();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert('Error submitting form: ' + error.message);
    }
};

// Function to handle back button click
const handleBackButtonClick = (event) => {
    event.preventDefault(); // Prevent the default button behavior
    // Do not set the form submission flag or show any message
    isFormSubmitted = false;
    // Redirect to the home page
    window.location.href = "home.html";
};

// Authentication check and attach event listeners
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Attach submit event listener to the form
        document.querySelector("form").addEventListener("submit", handleSubmit);

        // Attach event listener to the back button
        document.getElementById("backBtn").addEventListener("click", handleBackButtonClick);
    } else {
        alert('You must be logged in to submit this form.');
        window.location.href = 'login.html';
    }
});

// Prevent alert when navigating away from the page
window.addEventListener("beforeunload", (event) => {
    if (!isFormSubmitted) {
        delete event.returnValue;
    }
});
