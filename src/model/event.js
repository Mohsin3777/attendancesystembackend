const mongoose = require("mongoose");
const eventSchema =new mongoose.Schema({
 id:{
    type:String
 },
 name:{
    type:String
 }

})



module.exports = mongoose.model("evt", eventSchema);