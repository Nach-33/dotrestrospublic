require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  console.log('Reached Here');
  const token = (req.headers.authorization.split(':')[1]).split('=')[1];
  console.log(token);
  if (token == null || token == undefined) {
    console.log('Here Also');
    return res.redirect("/auth/google");
  }
  
  const user = jwt.verify(token, process.env.JWT_SECRET);
  console.log("jwt token: ", token);
  console.log("jwt user: ", user);
  if (!user) res.redirect("/auth/google");
  req.user = user;
  next();
};

module.exports = authenticate;