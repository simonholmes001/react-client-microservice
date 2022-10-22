const express = require("express");
const bodyParser = require("body-parser");

const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");

const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);

app.use(cors());

const { port } = require("./config");

const watcher = require("./watcher");
const subscription = require("./subscription");

watcher.Watcher();
subscription.Subscription();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);
});

const filePath = "./messages/rabbitmq_message.json";

if (watcher) {
  fs.readFile(filePath, function (err, data) {
    var jsonData = data;
    var jsonParsed = JSON.parse(jsonData);

    io.on("connection", (socket) => {
      socket.emit("sendingMessage", jsonParsed);
      console.log()
    });
  });
}

const Query = require("./routes/query");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/getImage", Query);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
