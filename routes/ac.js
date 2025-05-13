const express = require("express");
const router = express.Router();
const acController = require("../controllers/ac");

router.post("/submit-ac", acController.submitAC);

module.exports = router;
