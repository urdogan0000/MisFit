const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const pageRoute = require("./routes/pageRoute");
const usersRoute = require("./routes/usersRoute");

const app = express();

//template engine
app.set("view engine", "ejs");

global.userIN = null;

//Db Connection
const uri =process.env.DB_URI; //db uri comes from dot.env file so u can creat your own db uri is .env file with DB_URI variable
mongoose.connect(uri, { useNewUrlParser: true }, (err, res) => {
  err === null ? console.log("Db Connected") : console.log("Db bağlantısı yok");
});
//middlewares
//this middle ware keep session on db
app.use(
  session({
    secret: process.env.SECRET_KEY, // Buradaki texti değiştireceğiz.
    store: MongoStore.create({
      mongoUrl: uri,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

//Routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", pageRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
  console.log("Server Running");
});
