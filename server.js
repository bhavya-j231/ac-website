const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Import Routes
const authRoutes = require("./routes/auth");
const acRoutes = require("./routes/ac");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/acApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware for static files, body parsing, and session management
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL encoded data
app.use("/uploads", express.static("uploads")); // Serve uploaded images

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Use Routes
app.use(authRoutes); // Use authentication routes
app.use(acRoutes); // Use AC form routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
