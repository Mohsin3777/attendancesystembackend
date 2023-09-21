const mongoose = require("mongoose");



const attendanceMonthSchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
     monthNo :{
type:String
    },
    DayNo :{
      type:String
          },
    attendance :[

 {
    type: mongoose.Schema.Types.ObjectId,

    ref:'Attendance'
  },


    
      
    ]
  },
  {
    timestamps:true
  }
  )

  module.exports = mongoose.model('attendanceMonth', attendanceMonthSchema);