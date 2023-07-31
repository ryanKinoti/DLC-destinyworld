const express = require("express");
//controllers
const {
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  createUser,
  // getCountUsers
} = require("../controllers/users");

const { verifytoken, verifyUser, isAdmin } = require("../utils/verifyToken");

const route = express.Router();

//UPDATE
//verifyUser,
route.put("/:id",  updateUser);
//DELETE
//verifyUser,
route.delete("/:id",  deleteUser);
//GET
//verifyUser,
route.get("/:id",  getUserById);
//GET ALL
//isAdmin,
route.get("/", getUsers);
//Add new user
route.post("/", createUser);


module.exports = route;
