const User = require("../models/user");

module.exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.redirect("/signup.html?error=exists");
  }

  const user = new User({ email, password });
  await user.save();
  req.session.userId = user._id;
  res.redirect("/seller-dashboard.html");
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/login.html?error=noaccount");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.redirect("/login.html?error=invalid");
  }

  req.session.userId = user._id;
  res.redirect("/seller-dashboard.html");
};

module.exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login.html");
  });
};
