const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./db/connect");
var http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    // origin: "https://dotrestros.netlify.app",
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

global.io = io;
require("./sockets/socket.io");

require("dotenv").config();

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.setHeader("Access-Control-Allow-Credentials", true);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use("/auth/", authRoutes);
app.use("/orders/", authMiddleware, ordersRoutes);
app.use("/users/", authMiddleware, usersRoutes);
app.use("/reviews/", authMiddleware, reviewsRoutes);
app.use("/restaurants/", restaurantsRoutes);
app.use("/payments/", paymentsRoutes);

const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const startServer = async () => {
  await dbconnect(mongoURI);
  http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();