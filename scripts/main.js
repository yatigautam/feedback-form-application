// Import and configure Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLMWRHKeI1U_v47XBkEKM8i3KAdiJi0iI",
    authDomain: "feedback-application-323a0.firebaseapp.com",
    databaseURL: "https://feedback-application-323a0-default-rtdb.firebaseio.com",
    projectId: "feedback-application-323a0",
    storageBucket: "feedback-application-323a0.firebasestorage.app",
    messagingSenderId: "891495386697",
    appId: "1:891495386697:web:e7f4c79500bcd0435e7998",
    measurementId: "G-2LRKYP4WZN"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById("feedbackForm");
    const ratingInput = document.getElementById("rating");
    const ratingDisplay = document.getElementById("ratingDisplay");

    // Update rating display dynamically
    ratingInput.addEventListener("input", function() {
        ratingDisplay.textContent = ratingInput.value;
    });

    // Form submission event
    feedbackForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Get form data
        const rating = ratingInput.value;
        const comments = document.getElementById("comments").value;
        const userType = document.getElementById("userType").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        try {
            // Add document to Firestore
            await addDoc(collection(db, "feedbackResponses"), {
                rating,
                comments,
                userType,
                name,
                email,
                submittedAt: new Date() // Store the timestamp
            });

            // Redirect to Thank You page after submission
            window.location.href = 'thankyou.html';
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error submitting feedback. Please try again.");
        }
    });
});
