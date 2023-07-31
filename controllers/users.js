const User = require("../Models/User");
const bcrypt = require("bcryptjs");
// const createError = require("../utils/error");
//CREATE
const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      password: hash,
      // isAdmin: req.body.isAdmin,
      // profile: req.body.profile,
      // userRights:req.body.userRights
    }).save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

//UPDATE
const updateUser = async (req, res, next) => {
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(UpdatedUser);
  } catch (error) {
    next(error);
  }
};
//DELETE SHOW ROOM BY ID
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "the collection has been deleted" });
  } catch (error) {
    next(error);
  }
};

//GET SHOW ROOM BY ID
const getUserById = async (req, res, next) => {
  try {
    const Users = await User.findById(req.params.id);
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};

//GET ALL SHOW ROOMS
const getUsers = async (req, res, next) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    next(error);
  }
};

//GET COUNT USER

// const getCountUsers = async (req, res, next) => {
//     try {
//       const getAllUsersCount = await User.find();
//       res.status(200).json(getAllUsersCount);
//     } catch (error) {
//       next(error);
//     }
//   };

// exports.createProduct = createProduct
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
// exports.getCountUsers = getCountUsers;
