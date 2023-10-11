const router = require("express").Router();

const{
  
    getListOFStudents,
    updateUserDetails,
    // Prac,

   
    
} = require('../controller/user_controller')



router.get('/allUsers/',getListOFStudents)
router.put('/updateUserDetails/:_id',updateUserDetails)


// router.get('/Prac/',Prac)


module.exports =router;