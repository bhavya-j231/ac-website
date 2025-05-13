const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = 3000;

const authRoutes = require("./routes/auth");
const { isAuthenticated } = require("./middleware");

mongoose.connect("mongodb://localhost:27017/acApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files from the root directory (for HTML, CSS, JS)
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route to handle seller form submission
app.post("/submit-ac", upload.single("acImage"), (req, res) => {
  const acDetails = {
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
    condition: req.body.condition,
    imagePath: req.file ? req.file.path : null,
  };

  console.log("AC Details Submitted:", acDetails);
  res.send(
    '<h2>AC submitted successfully!</h2><a href="/seller-form.html">Go Back</a>'
  );
});

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRoutes);

// Example protected route
app.get("/seller-dashboard.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "seller-dashboard.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
