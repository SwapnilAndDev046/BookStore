const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI
const uri =
  "mongodb+srv://Swap_book404:Swap$gri11@cluster0.topd4.mongodb.net/BookStoreDB?retryWrites=true&w=majority&appName=Cluster0";

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

// Serve the registration page
app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "registration.html"));
});

// Serve the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "login.html"));
});

// Registration route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await MongoClient.connect(uri);

    const database = client.db("BookStoreDB");
    const usersCollection = database.collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Save the new user to the database
    await usersCollection.insertOne({ email: email, password: password });
    console.log("User registered:", email);

    // res.status(201).json({ message: "User registered successfully!" });
    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await MongoClient.connect(uri);

    const database = client.db("BookStoreDB");
    const usersCollection = database.collection("users");

    // Find the user
    const user = await usersCollection.findOne({
      email: email,
      password: password,
    });
    if (user) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }

    client.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Test the connection
MongoClient.connect(uri)
  .then((client) => {
    console.log("Connected to MongoDB");
    client.close();
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
