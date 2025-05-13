const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

(module.exports.submitAC = upload.single("acImage")),
  (req, res) => {
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
  };
