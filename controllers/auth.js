const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

//REGISTER NEW USER
const newUser = async (req, res, next) => {
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

    // const token = jwt.sign(
    //   {
    //     id: newUser._id,
    //     isAdmin: newUser.isAdmin,
    //     userRights: newUser.userRights,
    //   },
    //   process.env.key
    // );

    const { password, isAdmin, ...other } = newUser._doc;
    // req.actoken = token

    res
      // .cookie("access_token", token, {
      //   httpOnly: true,
      //   domain:"http://localhost:3000",
      //   path:"/"
      // })
      .status(200)
      .json({ ...other });
  } catch (error) {
    next(error);
  }
};

//LOGIN
const login = async (req, res, next) => {
  try {
    const checkUser = await User.findOne({ userEmail: req.body.userEmail });
    if (!checkUser) return next(createError(404, "User not found!"));

    const isPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );
    if (!isPassword) return next(createError(400, "Wrong Email or Password!"));

    // const token = jwt.sign(
    //   {
    //     id: checkUser._id,
    //     isAdmin: checkUser.isAdmin,
    //     userRights: checkUser.userRights,
    //   },
    //   process.env.key
    // );

    const { password, isAdmin, ...other } = checkUser._doc;
    // req.actoken = token;

    res
      // .cookie("access_token", token, {
      //   httpOnly: true,
      //   domain:"http://localhost:3000",
      //   path:"/"
      // })
      .status(200)
      .json({ ...other });
  } catch (error) {
    next(error);
  }
};
exports.newUser = newUser;
exports.login = login;
