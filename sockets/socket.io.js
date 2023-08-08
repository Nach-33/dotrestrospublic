const Order = require("../models/orders-model");

global.io.on("connection", (socket) => {
  socket.on("request-orders", async (data) => {
    const orders = (await Order.find({})).filter((order) => {
      return order.restaurant.code == data.code;
    });
    socket.emit("response-orders", { code: data.code, orders });
  });
});
