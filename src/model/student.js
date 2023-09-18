const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      index: true,
      unique: true,
      required: true,
      
    },
    email: {
      type: String,
      default:"mmm@g.com"
    },
    profilePic:{
      type:String,
      default:"https://images.unsplash.com/photo-1682685797507-d44d838b0ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
    },
    registered:{
      type:Boolean,
      default:false
    },
    // Other student-related fields
  });
  
  module.exports = mongoose.model('Student', studentSchema);