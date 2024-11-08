// Replace with your Google Sheets ID and API credentials
const SHEET_ID = "1rJLOLTdL7Q6iMmMH5StMFkcZuqoyKrgo5ZHyw9nPN_I";

// Load the Google API client and auth library
function loadClient() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: "AIzaSyD5Cvkmmg76ZW7yCkCVTHjeYvsXzQyYay4",
        clientId: "213262394241-5e3mrt45a6cuh5s6qh4jiuil14fnrtk3.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/spreadsheets",
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
    }).then(() => {
        console.log("Google Sheets API client loaded.");
    });
}

// Function to handle Google Sign-In
function handleSignIn() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        console.log("User signed in.");
        document.getElementById("signin-button").style.display = "none";
    });
}

// Function to submit feedback form data to Google Sheets
function submitFeedback() {
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;
    const reason = document.getElementById("reason").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const values = [
        [rating, comments, reason, name, email]
    ];

    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: "Sheet1!A:E", // Adjust range based on your Google Sheet
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: { values: values }
    }).then(response => {
        console.log(`${response.result.updates.updatedCells} cells appended.`);
        window.location.href = 'thankyou.html';
    }).catch(error => console.error("Error: ", error));
}

// Load the client on window load
window.onload = () => {
    loadClient();
};

// Collect and display chart data on home page (index.html)
document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById("feedbackForm");
    const ratingInput = document.getElementById("rating");
    const ratingDisplay = document.getElementById("ratingDisplay");
    
    // Update rating display dynamically
    ratingDisplay.textContent = ratingInput.value;

    ratingInput.addEventListener("input", function() {
        ratingDisplay.textContent = ratingInput.value;
    });

    // Chart.js setup for the feedback chart
    let feedbackChart;

    const ctx = document.getElementById("feedbackChart").getContext("2d");

    function updateChart() {
        const ratingsData = JSON.parse(localStorage.getItem("feedbackRatings") || "[]");

        const ratingsCount = [0, 0, 0, 0, 0]; // Ratings count from 1 to 5
        ratingsData.forEach(rating => {
            ratingsCount[rating - 1]++;
        });

        if (feedbackChart) {
            feedbackChart.destroy();
        }

        feedbackChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["1", "2", "3", "4", "5"],
                datasets: [{
                    label: "Feedback Ratings",
                    data: ratingsCount,
                    backgroundColor: "#4CAF50",
                    borderColor: "#388E3C",
                    borderWidth: 1
                }]
            }
        });
    }

    // Initialize chart with existing data (if any)
    updateChart();

    // Handle form submission
    feedbackForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent form reload

        const rating = ratingInput.value;
        const comments = document.getElementById("comments").value;
        const reason = document.getElementById("reason").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        // Store feedback data in localStorage (or send it to a server)
        let feedbackRatings = JSON.parse(localStorage.getItem("feedbackRatings") || "[]");
        feedbackRatings.push(parseInt(rating));
        localStorage.setItem("feedbackRatings", JSON.stringify(feedbackRatings));

        // Redirect to Thank You page
        window.location.href = 'thankyou.html';
    });
});