const express = require("express");
const route = express.Router();
const { getHistory } = require("../controllers/History");

route.get("/:id", getHistory);

module.exports = route;
