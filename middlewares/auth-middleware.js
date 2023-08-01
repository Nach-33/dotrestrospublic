require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  console.log('Reached Here');

  if (req.headers.cookie == null || req.headers.cookie == undefined) {
    console.log('Here Also');

    return res.redirect("/auth/google");
  }
  
  const token = req.headers.cookie.split("=")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  console.log("jwt token: ", token);
  console.log("jwt user: ", user);
  if (!user) res.redirect("/auth/google");
  req.user = user;
  next();
};

module.exports = authenticate;