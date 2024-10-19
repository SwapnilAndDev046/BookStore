// Get the theme toggle button
const themeToggle = document.getElementById("theme-toggle");

// Check for saved user preference in localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// Add event listener to toggle button
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save the user preference in localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️"; // Change icon to sun
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙"; // Change icon to moon
  }
});
