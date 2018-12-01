#!/usr/bin/env node
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const ioServer = require("socket.io");
const { Game } = require("./lib/game.js");

const port = process.env.PORT || 8080;
const app = express();
const server = http.Server(app);
const io = ioServer(server);

app.use(morgan("dev"));
app.get("/*", express.static("./client/build/"));

app.get("/api/test", (req, res) => {
  res.status(200).send({ status: "ok" });
});

const allGames = {};

io.on("connection", socket => {
  console.log("Connection to Socket");

  socket.on("join_game", ({ id, name }) => {
    const game = allGames[id];
    if (!game) {
      socket.emit("error", { message: "Can't find game." });
      return;
    }
    game.addPlayer({ name, socket }); // joins player to room
  });

  socket.on("join_host", () => {
    const game = new Game(socket);
    allGames[game.id] = game;
    socket.join(game.id);
    game.room = io.to(game.id);
  });
});

server.listen(port, () => {
  console.log("Server listening on " + port);
});
