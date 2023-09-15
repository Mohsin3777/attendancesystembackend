// const mongoose = require("mongoose");
// const attendanceSchema =new mongoose.Schema({
//  id:{
//     type:String
//  },
// attendance :[

// {
//     "date":Date.now(),
//     daylist:[]
// }
    
// ]
// })



// module.exports = mongoose.model("attendance", attendanceSchema);



const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },


});

const attendanceMonthSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  attendance :[]
})

module.exports = mongoose.model('Attendance', attendanceSchema);


