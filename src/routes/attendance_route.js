const router = require("express").Router();

const{
    markAttendance,
    addAttendance,
    getSingleDayAttendance,
    getAllDayAttendance,
    addStudentsInAttendance,
    

    registerStudent,
    getListOfregisterStudent
   
    
} = require('../controller/attendance_controller')


// router.post("/login",loginController);

router.post('/createAttendance',markAttendance)
router.patch('/AddAttendance/:_id',addAttendance)
router.get('/GetSingleDayAttendance/:_id',getSingleDayAttendance)
// router.put('/addStudentsInAttendance/:_id',addStudentsInAttendance)
router.get('/getallDaysAttendance',getAllDayAttendance)



module.exports =router;