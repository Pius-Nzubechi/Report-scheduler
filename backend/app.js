const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cronHandler = require("./api/cronHandler");
const cron = require("node-cron");
const app = express();

require("dotenv").config();

// Importing Our Routes
const scheduleRoutes = require("./api/routes/schedule");

// Connecting to database
mongoose
  .connect(
    `mongodb+srv://onwurahpius:${process.env.MONGO_ATLAS_PW}@cluster0.st1pm.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("db connected successfully"))
  .catch((err) => console.log(err));

// Morgan logs our various requests on the terminal
app.use(morgan("dev"));
// Body-Parser enables parsing of inputs from document body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS handling. To allow for cross origin sharing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

cron.schedule("* 49 * * * *", cronHandler);

// Routes that handle requests.
app.use("/", scheduleRoutes);
// Any request not handled by the routes is thrown as an error and the error message given
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.PORT || 2000, () => {
  console.log("app is haha");
});
