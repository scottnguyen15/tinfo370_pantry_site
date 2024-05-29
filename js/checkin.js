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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const yesRadio = document.getElementById('yes');
    const noRadio = document.getElementById('no');
    const returningUserSection = document.getElementById('returning-user');
    const newUserSection = document.getElementById('new-user');

    // Function to hide both sections initially
    function hideSections() {
        returningUserSection.style.display = 'none';
        newUserSection.style.display = 'none';
    }

    // Call hideSections initially to ensure both are hidden until a choice is made
    hideSections();

    yesRadio.addEventListener('change', () => toggleSections(true));
    noRadio.addEventListener('change', () => toggleSections(false));

    function toggleSections(isReturning) {
        if (isReturning) {
            returningUserSection.style.display = 'block';
            newUserSection.style.display = 'none';
        } else {
            returningUserSection.style.display = 'none';
            newUserSection.style.display = 'block';
        }
        setInputsRequired(returningUserSection, isReturning);
        setInputsRequired(newUserSection, !isReturning);
    }

    function setInputsRequired(section, required) {
        const inputs = section.querySelectorAll('input[type="text"], input[type="email"], select');
        inputs.forEach(input => {
            input.required = required && section.style.display !== 'none';
        });
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validate checkboxes within the "discovery-options"
        const isAnyChecked = Array.from(newUserSection.querySelectorAll('input[type="checkbox"][name="hearing"]')).some(checkbox => checkbox.checked);
        if (!isAnyChecked && newUserSection.style.display !== 'none') {
            alert('Please check at least one option in "How did you hear about the pantry?"');
            return;
        }

        // Validate email for new users
        if (noRadio.checked) {
            const email = newUserSection.querySelector('input[name="stu-email"]').value;
            if (!email.endsWith('@uw.edu')) {
                alert('Please enter a valid UW email address ending with @uw.edu');
                return;
            }
        }

        const formData = collectFormData();
        try {
            const docRef = await addDoc(collection(db, "checkin"), formData);
            console.log('Document successfully written! ID:', docRef.id);
            alert('Form submitted successfully!');
            window.location.reload(); // Refresh the page after the alert
        } catch (error) {
            console.error('Error writing document:', error);
            alert('Error submitting form: ' + error.message);
        }
    });

    function collectFormData() {
        const isReturningUser = yesRadio.checked;
        const formData = {
            studentName: document.querySelector(`#${isReturningUser ? 'returning-user' : 'new-user'} input[name="stu-name"]`).value,
            studentID: document.querySelector(`#${isReturningUser ? 'returning-user' : 'new-user'} input[name="stu-id"]`).value,
            createdAt: serverTimestamp()
        };

        if (!isReturningUser) {
            formData.discoveryMethods = Array.from(newUserSection.querySelectorAll('input[name="hearing"]:checked')).map(el => el.value);

            const email = newUserSection.querySelector('input[name="stu-email"]').value;
            if (email) formData.email = email;

            const ethnicity = newUserSection.querySelector('input[name="race"]:checked')?.value;
            if (ethnicity) formData.ethnicity = ethnicity;

            const genderIdentity = newUserSection.querySelector('input[name="gender"]:checked')?.value;
            if (genderIdentity) formData.genderIdentity = genderIdentity;

            const householdSize = newUserSection.querySelector('input[name="stu-house"]').value;
            if (householdSize) formData.householdSize = householdSize;
        }

        if (isReturningUser) {
            const schedulePreference = returningUserSection.querySelector('input[name="stu-schedule"]').value;
            if (schedulePreference) formData.schedulePreference = schedulePreference;
        }

        return formData;
    }

    // Function to handle back button click in Login page
const handleBackButtonClick = (event) => {
    event.preventDefault(); // Prevent the default button behavior
    // Do not set the form submission flag or show any message
    isFormSubmitted = false;
    // Redirect to the home page
    window.location.href = "index.html";
};
});
