const User = require("../models/users-model");
const generateJwtToken = require("../config/generateJWT");
const axios = require("axios");
require("dotenv").config();

const getToken = async (req, res) => {
  try {
    // console.log({ authorisationCode: req.query.code });
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code: req.query.code,
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_LINK}/auth/redirect`,
      grant_type: "authorization_code",
    };
    const qs = new URLSearchParams(values);
    // console.log(qs.toString());
    const { id_token, access_token } = await axios
      .post(url, qs.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`);
        return res.json({ message: error.message });
      });

    // console.log({ id_token: id_token, access_token: access_token });
    //
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        return res.json({ message: error.message });
      });
    // console.log(googleUser);
    //check if user exists in database
    const userExist = await User.findOne({ email: googleUser.email });

    let token;

    if (userExist) {
      token = generateJwtToken({
        id: userExist._id,
        email: googleUser.email,
        username: googleUser.name,
        googleId: googleUser.id,
      });
      return res.redirect(`${process.env.FRONTEND_URI}/logged/code=${token}`);
    }
    const user = await User.create({
      email: googleUser.email,
      username: googleUser.name,
      googleId: googleUser.id,
    });
    token = generateJwtToken({
      id: user._id,
      email: googleUser.email,
      username: googleUser.name,
      googleId: googleUser.id,
    });
    return res.redirect(`${process.env.FRONTEND_URI}/logged/code=${token}`);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};

module.exports = getToken;
