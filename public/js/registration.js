// Toggle password visibility
function togglePassword(inputId) {
  const passwordField = document.getElementById(inputId);
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
}

// Form submission handling (you can extend this as needed)
document
  .getElementById("registration-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Gather form data
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Display success message
        // Open MainPage in a new window
        window.open("/MainPage", "_blank");
      } else {
        const errorData = await response.json();
        alert(errorData.message); // Display error message from server
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  });
