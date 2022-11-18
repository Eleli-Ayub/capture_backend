require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./API/Users/userRouter");
const port = process.env.PORT || 4000;

app.use(express.json());

//connect to db
mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Connection successfull");
});

app.use("/users", userRouter);

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is running on port: " + port);
  }
});
