const express = require("express");
const { newUser, login } = require("../controllers/auth");
const route = express.Router();

route.post("/register", newUser);
route.post("/login", login);

module.exports = route;
