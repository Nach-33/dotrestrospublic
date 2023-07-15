const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./db/connect");
const cookieSession = require("cookie-session");
const passport = require("passport");

const authMiddleware = require("./middlewares/auth-middleware");

const orderRoutes = require("./routes/orders-routes");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/users-routes");
const reviewsRoutes = require("./routes/reviews-routes");
const restaurantRoutes = require("./routes/restaurants-routes");
const passportSetup = require("./config/passport-setup");
require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["nacho5Ame5owe"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const frontendLink = process.env.FRONTEND_URI;
app.enable("trust proxy");
app.use(
  cors({
    credentials: true,
    origin: frontendLink,
  })
);

app.use("/auth/", authRoutes);
app.use("/orders/", authMiddleware, orderRoutes);
app.use("/users/", authMiddleware, userRoutes);
app.use("/reviews/", authMiddleware, reviewsRoutes);
app.use("/restaurants/", restaurantRoutes);

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const startServer = async () => {
  await dbconnect(mongoURI);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
startServer();
