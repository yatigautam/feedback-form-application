const ctx = document.getElementById("ratingChart").getContext("2d");

database.ref("feedbacks").on("value", snapshot => {
  const data = snapshot.val();
  const ratings = Object.values(data).map(feedback => feedback.rating);

  const ratingCounts = [1, 2, 3, 4, 5].map(r => ratings.filter(rate => rate == r).length);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["1", "2", "3", "4", "5"],
      datasets: [{
        label: "Rating Distribution",
        data: ratingCounts,
        backgroundColor: "#007bff"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
