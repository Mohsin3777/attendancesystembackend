const router = require("express").Router();

const{
    markAttendance,
    addAttendance,
    getSingleDayAttendance
   
    
} = require('../controller/attendance_controller')


// router.post("/login",loginController);

router.post('/createAttendance',markAttendance)
router.put('/AddAttendance/:_id',addAttendance)
router.get('/GetSingleDayAttendance/:_id',getSingleDayAttendance)
module.exports =router;