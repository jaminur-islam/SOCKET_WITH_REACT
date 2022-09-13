const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

app.use(express.static("../socket-app-client/build"));

app.get("/express-server", (req, res) => {
  res.end("This is my backend");
});

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../socket-app-client", "build", "index.html")
  );
});

io.on("connection", (socket) => {
  console.log("New user connect");
  setTimeout(() => {
    socket.emit("msg", "this is message form server");
  }, 1000);
  socket.on("disconnect", (socket) => {
    console.log("User disconnect");
  });
});

server.listen(5000, () => {
  console.log("server listening port 5000");
});
