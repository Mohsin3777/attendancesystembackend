const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      // unique: true,
      required: true,
    },
    // Other student-related fields
  });
  
  module.exports = mongoose.model('Student', studentSchema);