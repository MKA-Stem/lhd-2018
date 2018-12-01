const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 8080;

app.use(require("morgan")("dev"));
app.get('/*', express.static("./client/build/"));

app.get('/api/test', (req, res) => {
    res.status(200).send({ status: "ok"});
});

io.on("connection", socket => {
    console.log("Connection to Socket");
    socket.emit("confirm", {status: "joined"});

    socket.on("disconnect", () => {
        console.log("Disconnection from Socket");
    });
});

server.listen(port, () => {
    console.log("Server listening on " + port);
})