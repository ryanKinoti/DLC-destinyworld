const express = require("express");
//controllers
const {
  createChildrens,
  updateChildrens,
  deleteChildrens,
  getChildrensById,
  getChildrens,
} = require("../controllers/Childrens");
const route = express.Router();
const { isAdmin } = require("../utils/verifyToken");

//CREATE
//isAdmin,
route.post("/", createChildrens);

//UPDATE
// isAdmin,
route.put("/:id", updateChildrens);
//DELETE
//isAdmin,
route.delete("/:id", deleteChildrens);
//GET
route.get("/:id", getChildrensById);
//GET ALL

route.get("/", getChildrens);

module.exports = route;
