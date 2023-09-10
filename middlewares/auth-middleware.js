require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  // console.log("Reached Here");
  if (
    req.headers.authorization == null ||
    req.headers.authorization == undefined
  ) {
    return res.json({ redirect: true, uri: process.env.BACKEND_LINK });
  }

  const token = req.headers.authorization.split(":")[1].split("=")[1];
  // console.log(token);

  if (token == null || token == undefined) {
    // console.log("Here Also");
    return res.json({ redirect: true, uri: process.env.BACKEND_LINK });
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("jwt token: ", token);
  // console.log("jwt user: ", user);
  if (!user) return res.json({ redirect: true, uri: process.env.BACKEND_LINK });
  req.user = user;
  next();
};

module.exports = authenticate;
