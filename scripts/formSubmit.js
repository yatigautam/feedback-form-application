document.getElementById("feedbackForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const feedbackData = {
      rating: document.getElementById("rating").value,
      comments: document.getElementById("comments").value,
      reasons: Array.from(document.querySelectorAll("input[name='reason']:checked")).map(checkbox => checkbox.value),
      name: document.getElementById("name").value,
      email: document.getElementById("email").value
    };
  
    database.ref("feedbacks").push(feedbackData).then(() => {
      alert("Feedback submitted successfully!");
      document.getElementById("feedbackForm").reset();
    }).catch(error => {
      console.error("Error submitting feedback:", error);
    });
  });
  