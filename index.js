const express = require('express')
const http = require('http')
const app = express();
const axios = require('axios')

const port = process.env.PORT || 8000
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true }));

const databaseConnection = require("./src/connections/conn");

// Connect to the MongoDB database
databaseConnection.connect();

app.use((req, res, next) => {
    res.header('access-control-allow-origin', '*');
    next();
  });


//route import
const attendanceRoute = require('./src/routes/attendance_route')
const registerUserRoute = require('./src/routes/register_user_route')
const userRoute = require('./src/routes/user_routes')
const authRoute = require('./src/routes/auth_route')
//routes
app.use("/api/attendance", attendanceRoute);
app.use("/api/registerUser", registerUserRoute);
app.use("/api/userDoc", userRoute);
app.use("/api/auth", authRoute);

// app.post('/', async (req, res) => {
//     const data = {
//         "id": 1,
//         "name": "ali"
//     }

//     try {
//         var d = await evt({
//             name: 'amir',
//             id: "2"
//         })

//         await d.save()

//         res.json(d)
//     } catch (error) {
//         res.status(400).json({ success: false, error: error.message })
//     }
// })

app.get('/getdata', async (req, res) => {


    try {
        var d = await evt.find()




        res.json(d)
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

app.get('/', async (req, res) => {
    // axios.get('https://jsonplaceholder.typicode.com/todos/1')
    var data;
    await axios.get('http://localhost:8000/getdata')
        .then((response) => {

            data = response.data
            console.log(response.data)
            return res.json({ data: response.data })
        });



    // res.json({data:data})
})

const Attendance = require('./src/model/attendance');
const Student = require('./src/model/student');
const attendanceMonth = require('./src/model/month_attendance');
const month_attendance = require('./src/model/month_attendance');

app.post('/markAttendance', async (req, res) => {


    try {


        const data = req.body
        const newAttendance = new Attendance({
            studentId: data.studentId, // Replace with the actual student ID
            date: Date.now(),     // Use the current date
            status: 'present',    // 'present' or 'absent'
        });

        var new1 = new attendanceMonth({
            date: Date.now().month(),
            // attendance:{$push:newAttendance}
            $push: { attendance: newAttendance }
        })

        // Save the attendance record to the database
        //    await   newAttendance.save();
        await new1.save()

        res.status(200).json({
            // data:newAttendance
            data: new1
        })



    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.post('/addStudent', async (req, res) => {
    try {
        const data = req.body
        var stude = await Student({
            name: data.name,
            rollNumber: data.rollNumber,
            status:"absent",
            registered:data.registered,
            email:data.email
            // endTime:new Date(),
            // arrivalTime:new Date(),
        })
        await stude.save()


    //     var attenModle = await Attendance({
    //         studentId:stude._id,
    //         date:Date.now(),
    //         status:"absent"
    //     });

    //  await   attenModle.save()
       return res.status(200).json({
        userData:stude,
            // attenModle: attenModle
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// const attendanceMonth = require('./src/model/month_attendance')

app.patch('/filter/:_id', async (req, res) => {
    try {
  var {attendanceStatus, studentId}= req.body

var quaryattendanceStatus ='absent'
var setattendanceStatus='present';
if(attendanceStatus=== 'absent'){
    quaryattendanceStatus ='present'
    setattendanceStatus ='absent'
}else if(attendanceStatus=== 'present'){
    quaryattendanceStatus ='absent'
    setattendanceStatus ='present'
   
}

    const d =await month_attendance.findOneAndUpdate(
       {$and :[{_id:req.params._id}, {attendance :{$elemMatch:{rollNumber:{$eq:'1'},}}} , {attendance :{$elemMatch:{status:{$eq:quaryattendanceStatus},}}},]},
        // {attendance :{$elemMatch:{'studentId._id':{$eq:'6508672131ccb6be176368eb'},}}},

        // {attendance :{$elemMatch:{'studentId._id':{$eq:'6508672131ccb6be176368eb'},}}},
        // {id: req.params._id},
    //    {attendance :{$elemMatch:{studentId:{$elemMatch:{rollNumber:{$eq:1}}},}}},
    {$set:{'attendance.$.status':'present'}},

    // {arrayFilters:[{"e.status":{$eq:'absent'}} ]},

    // {arrayFilters:[{'e.attendance' :{$elemMatch:{'e._id':{$eq:'650b2ad61ef2a3a11d9b1a7b'},}}},]},

    {$set:{'attendance.$.status':setattendanceStatus}},

    // {arrayFilters:[{"e.status":{$eq:'absent'}} ]},
    {new : true}
    
    
    )
    .populate({
        path:'attendance',
     
        // populate:{
        //     path: 'studentId',
        //     model:'Student'
        // }
    }) 

    // if(!d){
    //     return res.status(200).json({
    //       message:"all are present"
             
    //         })
    // }
       return res.status(200).json({
        userData:d,
         
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})


app.get('/fd/:_id',async(req,res)=>{
    try {
   
        const d =await month_attendance.findOne(
            // {attendance :{$elemMatch:{status:{$eq:'present'},}}},
        //  { $and:[  {_id :{$eq:req.params.id}}  , { attendance :{$elemMatch:{'_id':{$eq:'6508672131ccb6be176368ed'},}}}  ]}
        //    {attendance :{$elemMatch:{'studentId._id':{$eq:'6508672131ccb6be176368eb'},}}},
        // {$set:{'attendance.$.status':'present'}},
        // {new : true}

        { attendance :{$elemMatch:{_id:{$eq:'6508672131ccb6be176368ed'},}}}
        
        
        )
        // .populate({
        //     path:'attendance',
         
        //     populate:{
        //         path: 'studentId',
        //         model:'Student'
        //     }
        // }) 


           return res.status(200).json({
            userData:d,
             
            })
    
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
})


app.listen(port, () => {
    console.log('Server is running at 8000')
})