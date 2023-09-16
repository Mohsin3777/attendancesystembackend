const router = require("express").Router();

const{
  
    getListOFStudents
   
    
} = require('../controller/user_controller')



router.get('/allUsers/',getListOFStudents)


module.exports =router;