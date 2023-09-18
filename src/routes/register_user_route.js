const router = require("express").Router();

const{
  

    registerStudent,
    getListOfregisterStudent,
    
   
    
} = require('../controller/register_user_controller')


router.put('/registeredUser/:_id',registerStudent)
router.get('/listOfregisteredUser/',getListOfregisterStudent)


module.exports =router;