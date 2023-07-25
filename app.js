const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./db/connect");
const cookieSession = require("cookie-session");
const passport = require("passport");
var http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const authMiddleware = require("./middlewares/auth-middleware");

const ordersRoutes = require("./routes/orders-routes");
const authRoutes = require("./routes/auth-routes");
const usersRoutes = require("./routes/users-routes");
const reviewsRoutes = require("./routes/reviews-routes");
const restaurantsRoutes = require("./routes/restaurants-routes");
const paymentsRoutes = require("./routes/payments-routes");
const passportSetup = require("./config/passport-setup");

global.io = io;
require("./sockets/socket.io");

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
app.use("/orders/", authMiddleware, ordersRoutes);
app.use("/users/", authMiddleware, usersRoutes);
app.use("/reviews/", authMiddleware, reviewsRoutes);
app.use("/restaurants/", restaurantsRoutes);
app.use("/payments/", authMiddleware, paymentsRoutes);

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const startServer = async () => {
  await dbconnect(mongoURI);
  http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
startServer();
