const router = require("express").Router();
const passport = require("passport");
require('dotenv').config();
const frontendLink = process.env.FRONTEND_URI;

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get("/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect(frontendLink);
});

router.get("/status", (req, res) => {
  if (req.user) {
    console.log(res.user);
    res.json({ loggedIn: true });
  } else res.json({ loggedIn: false });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(frontendLink);
});

module.exports = router;
