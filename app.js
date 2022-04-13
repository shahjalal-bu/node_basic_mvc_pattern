const express = require("express");
require("dotenv").config();

//database_connection
const db = require("./db/db");

const path = require("path");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const shopsRouter = require("./routes/shops");

const app = express();
app.get("/profile", function (req, res) {
  console.log(req.query.name);
  res.send();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/shops", shopsRouter);

module.exports = app;
