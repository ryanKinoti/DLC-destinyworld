const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const { json } = require("body-parser");
const dbconnection = require("./dbConnection/dbconnection");
const usersRoute = require("./routes/Users");
const authRoute = require("./routes/Auth");
const userChildrens = require("./routes/Childrens");
const History = require("./routes/History");

// const http = require("http");
// const { Server } = require("socket.io");
// const { Socket } = require("dgram");

const dotenv = require("dotenv");
var cors = require("cors");
const app = express();

// const server = http.createServer(app);

//middlewares
dotenv.config();
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(bodyparser.json());

//routes
app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/children", userChildrens);
app.use("/api/history", History);
//error hundling middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";
  res.status(errorStatus).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(process.env.PORT || 5000, () => {
  dbconnection();
  console.log("server running");
});
