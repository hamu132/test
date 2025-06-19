const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// publicフォルダを公開
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("ユーザー接続");

  socket.on("chat message", (msg) => {
    console.log("受信:", msg);
    io.emit("chat message", msg); // 全クライアントにブロードキャスト
  });

  socket.on("disconnect", () => {
    console.log("切断されました");
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000 で待機中");
});