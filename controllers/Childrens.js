const mongoose = require("mongoose");
const Childrens = require("../Models/Childrens");
const Parents = require("../Models/Parents");
const { setCache, getCache } = require("../routeCache");
const { formatDate, calculateAge } = require("../utils/FormatDate");
const ObjectId = mongoose.Types.ObjectId;
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

  try {
    const parents = {
      parentName: req.body.parentName,
      parentContact: req.body.parentContact,
      Relationship: req.body.Relationship,
      fatherName: req.body.fatherName,
      fatherContact: req.body.fatherContact,
    };
    const newParents = new Parents(parents);
    const savedParents = await newParents.save();

    const dataToSave = {
      childName: req.body.childName,
      childGender: req.body.childGender,
      DOB: req.body.DOB,
      childCategory: category,
      visitor: req.body.visitor,
      ParentsId: savedParents.id,
    };
    const newChildrens = new Childrens(dataToSave);
    const savedChildrens = await newChildrens.save();

    // const UpdatedChild = await Childrens.findByIdAndUpdate(
    //   savedChildrens.id,
    //   { Parents: savedParents.id },
    //   { new: true }
    // );

    // const getAllChildrenss = await Childrens.find();
    // setCache(key, JSON.stringify(getAllChildrenss));
    // getChildrenAndParents();
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

    const parents = {
      parentName: child?.MOTHER_NAME ? child?.MOTHER_NAME : null,
      parentContact: child?.MOTHER_CONTACT ? child?.MOTHER_CONTACT : null,
      Relationship: child?.RELATIONSHIP ? child?.RELATIONSHIP : null,
      fatherName: child?.FATHER_CONTACT ? child?.FATHER_CONTACT : null,
      fatherContact: child?.FATHER_CONTACT ? child?.FATHER_CONTACT : null,
    };

    const newParents = new Parents(parents);
    const savedParents = await newParents.save();

    const dataToSave = {
      childName: child?.CHILD_NAME ? child?.CHILD_NAME : null,
      childGender: child?.GENDER ? child?.GENDER : null,
      DOB: child?.DOB ? child?.DOB : null,
      childCategory: category,
      visitor: false,
      ParentsId: savedParents?.id,
    };
    try {
      const newChildrens = new Childrens(dataToSave);
      const savedChildrens = await newChildrens.save();
    } catch (error) {
      next(error);
    }
  });

  try {
    // getChildrenAndParents();
    res.status(200).json({ message: "added" });
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
            // getChildrenAndParents();
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
      // getChildrenAndParents();
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
      childName: req?.body?.childName,
      childGender: req?.body?.childGender,
      DOB: req?.body?.DOB,
      childCategory: category,
      visitor: req?.body?.visitor,
    };
    const parents = {
      parentName: req?.body?.parentName,
      parentContact: req?.body?.parentContact,
      Relationship: req?.body?.Relationship,
      fatherName: req?.body?.fatherName,
      fatherContact: req?.body?.fatherContact,
    };

    const child = await Childrens.findByIdAndUpdate(
      req.params.id,
      { $set: dataToSave },
      { new: true }
    );

    const UpdatedChild = await Parents.findByIdAndUpdate(
      child?.ParentsId,
      { $set: parents },
      { new: true }
    );
    // getChildrenAndParents();
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
    // getChildrenAndParents();
    res.status(200).json({ message: "the collection has been deleted" });
  } catch (error) {
    next(error);
  }
};

//GET SHOW ROOM BY ID
const getChildrensById = async (req, res, next) => {
  try {
    const children = await Childrens.aggregate([
      {
        $match: {
          _id: ObjectId(req?.params?.id),
        },
      },
      {
        $lookup: {
          from: "parents",
          localField: "ParentsId",
          foreignField: "_id",
          as: "parents",
        },
      },
      {
        $unwind: "$parents",
      },
      {
        $project: {
          _id: "$_id",
          childName: "$childName",
          childCategory: "$childCategory",
          childGender: "$childGender",
          DOB: "$DOB",
          visitor: "$visitor",
          ParentsId: "$ParentsId",
          attendance: "$attendance",
          parentName: "$parents.parentName",
          parentContact: "$parents.parentContact",
          fatherName: "$parents.fatherName",
          fatherContact: "$parents.fatherContact",
          Relationship: "$parents.Relationship",
        },
      },
    ]);
    res.status(200).json(children);
  } catch (error) {
    next(error);
  }
};

//search by childname
const getByChildName = async (req, res, next) => {
  try {
    const children = await Childrens.aggregate([
      {
        $match: {
          childName: {
            $regex: req?.params?.name,
            $options: "i",
          },
        },
      },
      {
        $lookup: {
          from: "parents",
          localField: "ParentsId",
          foreignField: "_id",
          as: "parents",
        },
      },
      {
        $unwind: "$parents",
      },
      {
        $project: {
          _id: "$_id",
          childName: "$childName",
          childCategory: "$childCategory",
          childGender: "$childGender",
          DOB: "$DOB",
          visitor: "$visitor",
          ParentsId: "$ParentsId",
          attendance: "$attendance",
          parentName: "$parents.parentName",
          parentContact: "$parents.parentContact",
          fatherName: "$parents.fatherName",
          fatherContact: "$parents.fatherContact",
          Relationship: "$parents.Relationship",
        },
      },
    ]);
    res.status(200).json(children);
  } catch (error) {
    next(error);
  }
};

//GET ALL SHOW ROOMS
const getChildrens = async (req, res, next) => {
  try {
    let page = parseInt(req.query.p) || 1;
    let childrenPerPage = parseInt(req.query.limit) || 5;
    let skip = (page - 1) * childrenPerPage;
    const children = await Childrens.aggregate([
      {
        $lookup: {
          from: "parents",
          localField: "ParentsId",
          foreignField: "_id",
          as: "parents",
        },
      },
      {
        $unwind: "$parents",
      },
      {
        $skip: skip,
      },
      { $limit: childrenPerPage },
      {
        $project: {
          _id: "$_id",
          childName: "$childName",
          childCategory: "$childCategory",
          childGender: "$childGender",
          DOB: "$DOB",
          visitor: "$visitor",
          ParentsId: "$ParentsId",
          attendance: "$attendance",
          parentName: "$parents.parentName",
          parentContact: "$parents.parentContact",
          fatherName: "$parents.fatherName",
          fatherContact: "$parents.fatherContact",
          Relationship: "$parents.Relationship",
        },
      },
    ]);
    res.status(200).json(children);
  } catch (error) {
    next(error);
  }
};

//get totals
const getStats = async (req, res, next) => {
  try {
    const children = await Childrens.aggregate([
      {
        $lookup: {
          from: "parents",
          localField: "ParentsId",
          foreignField: "_id",
          as: "parents",
        },
      },
      {
        $unwind: "$parents",
      },
      {
        $project: {
          _id: "$_id",
          childName: "$childName",
          childCategory: "$childCategory",
          childGender: "$childGender",
          DOB: "$DOB",
          visitor: "$visitor",
          ParentsId: "$ParentsId",
          attendance: "$attendance",
          parentName: "$parents.parentName",
          parentContact: "$parents.parentContact",
          fatherName: "$parents.fatherName",
          fatherContact: "$parents.fatherContact",
          Relationship: "$parents.Relationship",
        },
      },
    ]);
    res.status(200).json(children);
  } catch (error) {
    console.log("stats", error);
    next(error);
  }
};

exports.createChildrens = createChildrens;
exports.updateChildrens = updateChildrens;
exports.deleteChildrens = deleteChildrens;
exports.getChildrens = getChildrens;
exports.getChildrensById = getChildrensById;
exports.createChildrensExcell = createChildrensExcell;
exports.updateChild = updateChild;
exports.getByChildName = getByChildName;
exports.getStats = getStats;
