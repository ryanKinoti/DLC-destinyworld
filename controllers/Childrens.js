const Childrens = require("../Models/Childrens");
const { setCache, getCache } = require("../routeCache");
const { formatDate, calculateAge } = require("../utils/FormatDate");
//CREATE
const createChildrens = async (req, res, next) => {
  const key = "children";
  let age = calculateAge(req.body.DOB);
  let category;

  if (age <= 2) {
    category = "Dazzlers";
  } else if (age > 2 && age <= 4) {
    category = "Dreamers";
  } else if (age > 4 && age <= 6) {
    category = "Dynamites";
  } else if (age > 6 && age <= 8) {
    category = "Discoverers";
  } else if (age > 8 && age <= 10) {
    category = "Doers";
  }
  const dataToSave = {
    parentName: req.body.parentName,
    parentContact: req.body.parentContact,
    Relationship: req.body.Relationship,
    childName: req.body.childName,
    childGender: req.body.childGender,
    DOB: req.body.DOB,
    childCategory: category,
    visitor: req.body.visitor,
    fatherName: req.body.fatherName,
    fatherContact: req.body.fatherContact,
  };
  try {
    const newChildrens = new Childrens(dataToSave);
    const savedChildrens = await newChildrens.save();

    const getAllChildrenss = await Childrens.find();
    console.log(`Cache update new record for ${key}`);
    setCache(key, JSON.stringify(getAllChildrenss));

    res.status(200).json(savedChildrens);
  } catch (error) {
    next(error);
  }
};

//UPDATE
const updateChildrens = async (req, res, next) => {
  const key = "children";
  console.log("update url", key);
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
        async (err, updatedDocument) => {
          if (err) next(err);
          else if (updatedDocument) {
            const getAllChildrenss = await Childrens.find();
            console.log(`Cache update for ${key}`);
            setCache(key, JSON.stringify(getAllChildrenss));
            res.status(200).json(updatedDocument);
          } else next(err);
        }
      );
    } else {
      const UpdatedChildrens = await Childrens.findByIdAndUpdate(
        req.params.id,
        { $push: { attendance: attendance } },
        { new: true }
      );
      const getAllChildrenss = await Childrens.find();
      console.log(`Cache update for ${key}`);
      setCache(key, JSON.stringify(getAllChildrenss));
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
  const key = "children";
  try {
    if (getCache(key)) {
      console.log(`Cache hit for ${key}`);
      res.status(200).json(JSON.parse(getCache(key)));
    } else {
      const getAllChildrenss = await Childrens.find();
      console.log(`Cache miss for ${key}`);
      setCache(key, JSON.stringify(getAllChildrenss));
      res.status(200).json(getAllChildrenss);
    }
  } catch (error) {
    next(error);
  }
};

// const fetchChildrens = async () => {
//   console.log("fetching children");
//   const key = "children";
//   try {
//     const getAllChildrenss = await Childrens.find();
//     console.log("fetched children", getAllChildrenss);
//     setCache(key, JSON.stringify(getAllChildrenss));
//   } catch (error) {
//     console.log(error);
//   }

//   setTimeout(fetchChildrens, 50000);
// };
// fetchChildrens();

exports.createChildrens = createChildrens;
exports.updateChildrens = updateChildrens;
exports.deleteChildrens = deleteChildrens;
exports.getChildrens = getChildrens;
exports.getChildrensById = getChildrensById;

// exports.fetchChildrens = fetchChildrens;
