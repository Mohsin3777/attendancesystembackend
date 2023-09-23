const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      unique: true,
      required: true,
      
    },
    email: {
      type: String,
      default:"mmm@g.com"
    },
    profilePic:{
      type:String,
      default:"https://images.unsplash.com/photo-1694793587915-38b73970e73d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=60"
    },
    registered:{
      type:Boolean,
      default:false
    },
    status: {
      type: String,
      enum: ['present', 'absent'],
      required: true,
    },
    // Other student-related fields
  });
  
  module.exports = mongoose.model('Student', studentSchema);