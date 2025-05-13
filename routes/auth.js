const express = require("express");
const path = require("path");
const router = express.Router();
const authController = require("../controllers/auth");
const { isAuthenticated } = require("../middleware");

// Auth Routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/seller-dashboard.html", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "seller-dashboard.html"));
});

module.exports = router;
