// app.js

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const users = {};

app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", (data) => {
    socket.broadcast.emit("chat-message", { message: data.message, userName: users[socket.id] });
  });
});

const port = 5000;
http.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
