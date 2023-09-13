const Childrens = require("../Models/Childrens");
const { setCache, getCache } = require("../routeCache");
const { formatDate, calculateAge } = require("../utils/FormatDate");
//CREATE
const createChildrens = async (req, res, next) => {
  const key = "children";
  let age = req.body.DOB ? calculateAge(req.body.DOB) : null;
  let category = null;

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
    setCache(key, JSON.stringify(getAllChildrenss));

    res.status(200).json(savedChildrens);
  } catch (error) {
    next(error);
  }
};

// upload excel
const createChildrensExcell = async (req, res, next) => {
  const key = "children";
  await req?.body?.data?.map(async (child) => {
    let age = child?.DOB ? calculateAge(child?.DOB) : null;
    let category = null;

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
      parentName: child?.MOTHER_NAME ? child?.MOTHER_NAME : null,
      parentContact: child?.MOTHER_CONTACT ? child?.MOTHER_CONTACT : null,
      Relationship: child?.RELATIONSHIP ? child?.RELATIONSHIP : null,
      childName: child?.CHILD_NAME ? child?.CHILD_NAME : null,
      childGender: child?.GENDER ? child?.GENDER : null,
      DOB: child?.DOB ? child?.DOB : null,
      childCategory: category,
      visitor: false,
      fatherName: child?.FATHER_CONTACT ? child?.FATHER_CONTACT : null,
      fatherContact: child?.FATHER_CONTACT ? child?.FATHER_CONTACT : null,
    };

    try {
      const newChildrens = new Childrens(dataToSave);
      const savedChildrens = await newChildrens.save();
    } catch (error) {
      next(error);
    }
  });

  try {
    const getAllChildrenss = await Childrens.find();
    setCache(key, JSON.stringify(getAllChildrenss));
    res.status(200).json(getAllChildrenss);
  } catch (error) {
    next(error);
  }
};
//UPDATE
const updateChildrens = async (req, res, next) => {
  const key = "children";
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
      setCache(key, JSON.stringify(getAllChildrenss));
      res.status(200).json(UpdatedChildrens);
    }
  } catch (error) {
    next(error);
  }
};
const updateChild = async (req, res, next) => {
  const key = "children";
  try {
    let age = req.body?.DOB ? calculateAge(req.body.DOB) : null;
    let category = null;

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

    const UpdatedChild = await Childrens.findByIdAndUpdate(
      req.params.id,
      { $set: dataToSave },
      { new: true }
    );
    const getAllChildrenss = await Childrens.find();
    setCache(key, JSON.stringify(getAllChildrenss));
    res.status(200).json(UpdatedChild);
  } catch (error) {
    next(error);
  }
};
//DELETE SHOW ROOM BY ID
const deleteChildrens = async (req, res, next) => {
  const key = "children";
  try {
    await Childrens.findByIdAndDelete(req.params.id);
    const getAllChildrenss = await Childrens.find();
    setCache(key, JSON.stringify(getAllChildrenss));
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
      res.status(200).json(JSON.parse(getCache(key)));
    } else {
      const getAllChildrenss = await Childrens.find();

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
exports.createChildrensExcell = createChildrensExcell;
exports.updateChild = updateChild;
