const mongoose = require("mongoose");

const ParentsSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Parents", ParentsSchema);
