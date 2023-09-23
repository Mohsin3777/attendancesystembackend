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
  // registered:{
  //   type:Boolean,
  //   default:false
  // },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },

  roll: {
    type: Number,
    // required: true,
    default:13
  },


});



module.exports = mongoose.model('Attendance', attendanceSchema);


