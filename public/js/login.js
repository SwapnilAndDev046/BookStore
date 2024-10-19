// Toggle password visibility
function togglePassword(inputId) {
  const passwordField = document.getElementById(inputId);
  const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
}

// Form submission handling
document
  .getElementById("login-form")
  .addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent the default form submission

      // Gather form data
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const formData = {
          email: email,
          password: password,
      };

      try {
          const response = await fetch("/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              const data = await response.json();
              alert(data.message); // Display success message
              // Optionally, redirect to another page or clear the form
          } else {
              alert("Login failed!");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred during login.");
      }
  });
