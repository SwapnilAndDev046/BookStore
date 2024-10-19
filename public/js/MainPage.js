// Sample PDF data for searching
const pdfData = [
  { name: "Maths1,Maths 1", url: "sem1/m1.html" },
  { name: "Physics1 ,physics 1", url: "sem1/phy1.html" },
  { name: "Computer Programming", url: "sem1/cp.html" },
  // Add more subjects here as needed
];

// Function to toggle the login form
function toggleLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm.style.display === "block") {
    loginForm.style.display = "none";
  } else {
    loginForm.style.display = "block";
  }
}

// Function to handle search on "Enter" key press
function searchPDFs(event) {
  if (event.key === "Enter") {
    const input = document
      .getElementById("pdfSearch")
      .value.toLowerCase()
      .trim();
    const result = pdfData.find((pdf) =>
      pdf.name.toLowerCase().includes(input)
    );

    if (result) {
      // Redirect to the subject's page for PDF download
      window.location.href = result.url;
    } else {
      // If no match is found, show an alert
      alert("Subject not found. Please try again.");
    }
  }
}

// Adding event listener to search bar to trigger search on Enter key
document.getElementById("pdfSearch").addEventListener("keypress", searchPDFs);
