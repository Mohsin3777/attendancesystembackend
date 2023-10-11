const router = require("express").Router();

const{
  

    createStudent
   
    
} = require('../controller/auth_controller')

router.post('/addStudent',createStudent)

module.exports =router;