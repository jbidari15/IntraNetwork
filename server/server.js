require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middlewares/auth");
const PORT = 8080;

app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);

app.use(function(req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is running on Port ${PORT}`);
});
