const router = require("express").Router();

const{
    markAttendance,
    addAttendance,
    getSingleDayAttendance,

    registerStudent,
    getListOfregisterStudent
   
    
} = require('../controller/attendance_controller')


// router.post("/login",loginController);

router.post('/createAttendance',markAttendance)
router.put('/AddAttendance/:_id',addAttendance)
router.get('/GetSingleDayAttendance/:_id',getSingleDayAttendance)

router.post('/registeredUser/:_id',registerStudent)
router.get('/listOfregisteredUser/',getListOfregisterStudent)

module.exports =router;