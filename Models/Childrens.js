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
      required: true,
    },
    parentContact: {
      type: String,
      required: true,
    },
    Relationship: {
      type: String,
      required: true,
    },
    childName: {
      type: String,
      required: true,
    },
    childCategory: {
      type: String,
      required: true,
    },
    childAge: {
      type: String,
      required: true,
    },
    childGender: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      // required: true,
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
