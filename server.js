const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Example route (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "registration.html"));
});

// Registration route
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  console.log("Email:", email);
  console.log("Password:", password);
  // Here you would typically save the user to the database
  // For now, just send a response
  res.status(201).json({ message: "User registered successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
