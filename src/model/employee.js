const mongoose = require("mongoose");
const employeeSchema =new mongoose.Schema({
 id:{
    type:String
 },
 name:{
    type:String
 },
 salery:{
    type:String,
 }

})



module.exports = mongoose.model("employee", employeeSchema);