require("dotenv").config();

const getURL = () => {

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: `${process.env.BACKEND_LINK}/auth/redirect`,
    client_id: process.env.OAUTH_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: ["email","profile"].join(" "),
  };

  const qs = new URLSearchParams(options);

  // console.log({ googleAuthURL: `${rootUrl}?${qs.toString()}` });
  return (`${rootUrl}?${qs.toString()}`);
};

module.exports = getURL;
