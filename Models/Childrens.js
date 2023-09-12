const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    present: { type: Boolean, required: true },
  },
  {
    _id: false,
  }
);

const ChildrensSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      // required: true,
    },
    parentContact: {
      type: String,
      // required: true,
    },

    fatherName: {
      type: String,
      // required: true,
    },
    fatherContact: {
      type: String,
      // required: true,
    },

    Relationship: {
      type: String,
      // required: true,
    },
    childName: {
      type: String,
      // required: true,
    },
    childCategory: {
      type: String,
      // required: true,
    },
    childGender: {
      type: String,
      // required: true,
    },
    DOB: {
      type: String,
      // required: true,
    },
    visitor: {
      type: Boolean,
      // required: true,
      default: false,
    },
    attendance: {
      type: [attendanceSchema],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Childrens", ChildrensSchema);
