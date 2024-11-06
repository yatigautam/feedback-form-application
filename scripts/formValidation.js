document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;
  
    if (rating === "" || comments === "") {
      alert("Please fill in all required fields.");
      e.preventDefault();
    }
  });
  