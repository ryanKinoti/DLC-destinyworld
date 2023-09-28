const { model } = require("mongoose");
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
    childName: {
      type: String,
    },
    childCategory: {
      type: String,
    },
    childGender: {
      type: String,
    },
    DOB: {
      type: String,
    },
    visitor: {
      type: Boolean,

      default: false,
    },
    ParentsId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    attendance: {
      type: [attendanceSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Childrens", ChildrensSchema);
