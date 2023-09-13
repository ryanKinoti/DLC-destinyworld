const express = require("express");
//controllers
const {
  createChildrens,
  updateChildrens,
  deleteChildrens,
  getChildrensById,
  getChildrens,
  createChildrensExcell,
  updateChild,
} = require("../controllers/Childrens");
const route = express.Router();
const { isAdmin } = require("../utils/verifyToken");

//CREATE
//isAdmin,
route.post("/", createChildrens);

//UPDATE
// isAdmin,
route.put("/:id", updateChildrens);
route.put("/child/:id", updateChild);
//DELETE
//isAdmin,
route.delete("/:id", deleteChildrens);
//GET
route.get("/:id", getChildrensById);
//GET ALL

route.get("/", getChildrens);
//ulpoad excell

route.post("/xlsx", createChildrensExcell);

module.exports = route;
