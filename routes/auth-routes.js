const router = require("express").Router();
require("dotenv").config();
const getGoogleAuthToken = require("../config/getGoogleAuthToken");
const getURL = require("../config/getGoogleAuthURL")
const frontendLink = process.env.FRONTEND_URI;

router.get("/google",(req,res)=>{
  res.redirect(getURL());
});

router.get("/redirect", getGoogleAuthToken);

module.exports = router;
