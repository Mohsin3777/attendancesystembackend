const attendanceMonth = require('../model/month_attendance')
const Attendance = require('../model/attendance');
const Student = require('../model/student');
const attendance = require('../model/attendance');
const student = require('../model/student');
var list = [
    "january",
    "febrary",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
]

const createAttendance11 = async (req, res) => {

    var studentid_with_status = []
    try {


        // const checkAlreadyCreated= await attendanceMonth.findOne({date:Date.now()})

        // console.log(checkAlreadyCreated)
        // if(checkAlreadyCreated)
        // return res.status(400).json({ message: "Today date list already created" })
        var attendance = await Student.find()

        if (!attendance) {
            return res.status(400).json({ message: "List is Empty" })
        }

        attendance.map((val) => {
         

            studentid_with_status.push(Attendance({
                studentId: val['_id'], // Replace with the actual student ID
                date: Date.now(),     // Use the current date
                status: 'absent',
            }))
        })
        // return res.status(200).json({ data:list })

        const date = new Date();
        const currentMonth = date.getMonth();
        const currentday = date.getDate();
        console.log(currentday); //2020
        const data = req.body


        var new1 = new attendanceMonth({
            // date:  Date("2023-09-14T08:45:28.662Z"), 
            // date: new Date("2018-10-24T08:55:13.331Z"),
            date:Date.now(),
            monthNo: studentid_with_status[currentMonth],
            DayNo:currentday.toString(),
            attendance: studentid_with_status
            // attendance:{$push:newAttendance}
            // $push :{attendance:  newAttendance}
        })

        // console.log(new1)
        await new1.save()

        return res.status(200).json({
            // data:newAttendance
            data: new1
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const createAttendance = async (req, res) => {

    var studentid_with_status = []
    try {
var d=new Date()
console.log(d)

console.log(d.getDay()+ ' '+d.getMonth()+ ' ' +d.getFullYear())
        var atten = await  attendanceMonth.findOne({date:{ $gte: d.setHours(0, 0, 0, 0), $lt: d.setHours(23, 59, 59, 999) } })
        if (atten) {
            // console.log(atten)
            return res.status(400).json({ message:"Already created" })
        }
var students =await Student.find({registered:true})


        
        var attendance = await Attendance.find({registered:{$in:true}})

        if (!attendance) {
            // return res.status(400).json({ message: "List is Empty" })
        }
// console.log(attendance)
// for (var j = 0; j < attendance.length; j++){

//     console.log(attendance[j].registered);
//     studentid_with_status.push(attendance[j]._id)
    
//     }

        const date = new Date();
        const currentMonth = date.getMonth();
        const currentday = date.getDate();
        console.log(currentday); //2020
        const data = req.body


        var new1 = new attendanceMonth({
        
            date:date.getTime(),
            monthNo: studentid_with_status[currentMonth],
            DayNo:currentday.toString(),
            attendance: studentid_with_status
            // attendance:{$push:newAttendance}
            // $push :{attendance:  newAttendance}
        })

        // console.log(new1)
        await new1.save()

        return res.status(200).json({
            // data:newAttendance
            data: new1
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const addStudentsInAttendance= async(req,res)=>{
    try {
        const attenDanceMonth= await attendanceMonth.findById({_id:req.params._id})
var studentid_with_status=[]
var listOFAttendanceIds=[]
    if(!attenDanceMonth){
        return res.status(400).json({success:false,message:"attendancemonth not found"})
    }

    const attendance = await Attendance.find()

    if(!attendance){
        return res.status(400).json({success:false,message:"attendance not found"})
    }

  


    // students.map((val) => {
         

    //     studentid_with_status.push(Attendance({
    //         studentId: val['_id'], // Replace with the actual student ID
    //         date: Date.now(),     // Use the current date
    //         status: 'absent',
    //     }))

        
    // })
    // console.log(studentid_with_status)
    
    attendance.map((val)=>{
        console.log(val._id.toHexString())
        listOFAttendanceIds.push(val._id.toHexString())
                })
    


 var updateData=    await attendanceMonth.findByIdAndUpdate({_id:req.params._id},{
        attendance: listOFAttendanceIds
    },
    
    {new:true})

return res.status(200).json({success:true,data:updateData})
    } catch (error) {
        return res.status(500).json({success:false,message:error.toString()})
    }
}



const addAttendance = async (req, res) => {


    var updateList
    try {

        const data = req.body



        var attendanceList = await attendanceMonth.findById({ _id: req.params._id });
        if (!attendanceList) {
            return res.status(400).json({ success: false, message: "Not found" })
        } else {
    

            updateList = await updateSingelStatus(attendanceList['attendance'], 'absent', "present", data.studentId);

            //  console.log(updateList)
            var finalData = await attendanceMonth.findByIdAndUpdate(
                {_id: req.params._id},
                {attendance: updateList},
                { new: true }
            )
            res.send(attendanceList)
        }


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }



}

const toMarkAllpresent = async (req, res) => {
    var updateList
    try {

        const data = req.body



        var attendanceList = await attendanceMonth.findById({ _id: req.params._id });
        if (!attendanceList) {
            return res.status(400).json({ success: false, message: "Not found" })
        } else {
            updateList = markAllpresent(attendanceList['attendance'], 'absent', "present");
            var finalData = await attendanceMonth.findByIdAndUpdate(
                { _id: req.params._id },
                { attendance: updateList },
                { new: true }
            )
            res.send(attendanceList)
        }


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const getSingleDayAttendance = async (req, res) => {
    try {
        const monthAttendance = await attendanceMonth.findById({ _id: req.params._id },
           
            )
            // .populate('attendance')
            
            .populate({
                path:'attendance',
                // populate: { path: 'attendance' },
                model: 'Attendance',
                populate:{
                    path: 'studentId'
                }
            }) 
     
       
       
        if (!monthAttendance)
            return res.status(400).json({ success: false, message: "not found" })

console.log(monthAttendance)
        return res.status(200).json({ success: true, data: monthAttendance })
    } catch (error) {
        return res.status(400).json({ success: true, error: error.message })

    }

}









var markAllpresent = (schools, oldName, name) => {
    return schools.map(item => {
        console.log(item)
        var temp = Object.assign({}, item);
        if (temp.status === oldName) {
            temp.status = name;
        }
        return temp;
    });
}

var updateSingelStatus = (schools, oldName, name, id) => {
    return schools.map(item => {

        var temp = Object.assign({}, item);

        console.log(temp.studentId.toHexString())
        if (temp.studentId.toHexString() === id) {


            if (temp.status === oldName) {
                temp.status = name;
            }
        }
        return temp;
    });
}









module.exports = {
    markAttendance: createAttendance,
    addAttendance,
    getSingleDayAttendance,
    addStudentsInAttendance


    // getAllEventController,
    // addEventSchedule,
    // getSingleEventWithIdController,
    // uploadTitleImagevent,
    // uploadMultiImages,
}