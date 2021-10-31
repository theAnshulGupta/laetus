const express = require("express");
const path = require("path");
const cors = require("cors");

const httpPort = 8080;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(require("./src/routes"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}`);
});
