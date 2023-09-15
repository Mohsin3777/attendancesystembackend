const mongoose = require("mongoose");


const attendanceYearSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    attendance :[]
  })

  module.exports = mongoose.model('attendanceYear', attendanceYearSchema);