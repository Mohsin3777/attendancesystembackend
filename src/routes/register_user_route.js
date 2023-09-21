const router = require("express").Router();

const{
  

    registerStudent,
    removeRegister,
    getListOfregisterStudent
   
    
} = require('../controller/register_user_controller')


router.put('/registeredUser/:_id',registerStudent)
router.put('/removeRegisteredUser/:_id',removeRegister)
router.get('/listOfregisteredUser/',getListOfregisterStudent)


module.exports =router;