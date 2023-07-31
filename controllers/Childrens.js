const Childrens = require("../Models/Childrens");
const { formatDate } = require("../utils/FormatDate");
//CREATE
const createChildrens = async (req, res, next) => {
  try {
    const newChildrens = new Childrens(req.body);
    const savedChildrens = await newChildrens.save();
    res.status(200).json(savedChildrens);
  } catch (error) {
    next(error);
  }
};

//UPDATE
const updateChildrens = async (req, res, next) => {
  const attendance = { date: formatDate(), present: req.body.present };
  try {
    const Childrenss = await Childrens.findById(req.params.id);
    if (
      Childrenss?.attendance?.reduce((accumulator, currentObject) => {
        if (currentObject.date === formatDate()) {
          return true;
        } else {
          return false;
        }
      }, null)
    ) {
      Childrens.findOneAndUpdate(
        { _id: req.params.id, "attendance.date": formatDate() },
        { $set: { "attendance.$.present": attendance?.present } },
        { new: true },
        (err, updatedDocument) => {
          if (err) next(err);
          else if (updatedDocument) res.status(200).json(updatedDocument);
          else next(err);
        }
      );
    } else {
      const UpdatedChildrens = await Childrens.findByIdAndUpdate(
        req.params.id,
        { $push: { attendance: attendance } },
        { new: true }
      );
      res.status(200).json(UpdatedChildrens);
    }
  } catch (error) {
    next(error);
  }
};
//DELETE SHOW ROOM BY ID
const deleteChildrens = async (req, res, next) => {
  try {
    await Childrens.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "the collection has been deleted" });
  } catch (error) {
    next(error);
  }
};

//GET SHOW ROOM BY ID
const getChildrensById = async (req, res, next) => {
  try {
    const Childrenss = await Childrens.findById(req.params.id);
    res.status(200).json(Childrenss);
  } catch (error) {
    next(error);
  }
};

//GET ALL SHOW ROOMS
const getChildrens = async (req, res, next) => {
  try {
    const getAllChildrenss = await Childrens.find();
    res.status(200).json(getAllChildrenss);
  } catch (error) {
    next(error);
  }
};

exports.createChildrens = createChildrens;
exports.updateChildrens = updateChildrens;
exports.deleteChildrens = deleteChildrens;
exports.getChildrens = getChildrens;
exports.getChildrensById = getChildrensById;
