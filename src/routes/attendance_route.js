const router = require("express").Router();

const{
    markAttendance,
    addAttendance,
    getSingleDayAttendance,
    getAllDayAttendance,


    markArrivalTimeAttendance,
    markEndTimeAttendance,
    

    registerStudent,
    getListOfregisterStudent
   
    
} = require('../controller/attendance_controller')


// router.post("/login",loginController);


//create daily attendance
router.post('/createAttendance',markAttendance)

router.patch('/AddAttendance/:_id',addAttendance)


//get singel day attendance
router.get('/GetSingleDayAttendance/:_id',getSingleDayAttendance)
// router.put('/addStudentsInAttendance/:_id',addStudentsInAttendance)

//get singel all day attendance
router.get('/getallDaysAttendance',getAllDayAttendance)



//add arrival time of student with make present
router.patch('/markArrivalTime/:_id',markArrivalTimeAttendance)

//add end time of student 
router.patch('/markEndTime/:_id',markEndTimeAttendance)





module.exports =router;