const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const i18n = require("i18n")
const userRoute = require("./routes/userRoute")
const errorHandler = require("./middlewares/errorHandler")


const app = express();
const port = process.env.PORT || 5000


//Middlewares
app.use(CookieParser())
app.use(i18n.init)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

// Routes Middleware
app.use("/api/users", userRoute);


app.post("/cookie", (req, res) => {
    res.cookie("cookie", "manik")
    res.send("cokie")
})

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
  console.log(req.cookies);
});

// Error Middleware
app.use(errorHandler);


//Connect to database and starting the server
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        app.listen(port, () => {
            console.log("Backend server running in port " + port);
        })
    })
    .catch((err) => {
        console.log(err);
    })