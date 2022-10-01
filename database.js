const request = require("request");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const dbURL = "mongodb+srv://admin:admin@cluster0.3f6xkzm.mongodb.net/SignInProject";

//connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI || dbURL,
    { useUnifiedTopology:true, useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));