const attendanceMonth = require('../model/month_attendance')
const Attendance = require('../model/attendance');
const Student = require('../model/student');
const { urlencoded } = require('express');


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





//create daily attendance
const createAttendance = async (req, res) => {

    var studentid_with_status = []
    try {
        var d = new Date()
        console.log(d)

        console.log(d.getDay() + ' ' + d.getMonth() + ' ' + d.getFullYear())
        var atten = await attendanceMonth.findOne({ date: { $gte: d.setHours(0, 0, 0, 0), $lt: d.setHours(23, 59, 59, 999) } })
            .populate({
                path: 'attendance',
                // populate: { path: 'attendance' },
                // model: 'Attendance',
                // populate:{
                //     path: 'studentId'
                // }
            })
        if (atten) {
            // console.log(atten)
            // return res.status(400).json({ message:"Already created" })
            return res.status(200).json({
                success: true, message: "Already created",
                data: atten
            })
        }
        var students = await Student.find({ registered: true })






        students.map((val) => {
            if (val.registered === true) {
                studentid_with_status.push(val)
            }
        })


        const date = new Date();
        const currentMonth = date.getMonth();
        const currentday = date.getDate();
        console.log(currentday); //2020
        const data = req.body


        var new1 = new attendanceMonth({

            date: date.getTime(),
            monthNo: studentid_with_status[currentMonth],
            DayNo: currentday.toString(),
            attendance: studentid_with_status
            // attendance:{$push:newAttendance}
            // $push :{attendance:  newAttendance}
        })

        // console.log(new1)
        const finalData = await new1.save()

        return res.status(200).json({

            data: finalData
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//xxxxxxxxxxxxxxxxxxxxxxxx create attendance end xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


const addStudentsInAttendance = async (req, res) => {
    try {
        const attenDanceMonth = await attendanceMonth.findById({ _id: req.params._id })
        var studentid_with_status = []
        var listOFAttendanceIds = []
        if (!attenDanceMonth) {
            return res.status(400).json({ success: false, message: "attendancemonth not found" })
        }

        const attendance = await Attendance.find()

        if (!attendance) {
            return res.status(400).json({ success: false, message: "attendance not found" })
        }




        // students.map((val) => {


        //     studentid_with_status.push(Attendance({
        //         studentId: val['_id'], // Replace with the actual student ID
        //         date: Date.now(),     // Use the current date
        //         status: 'absent',
        //     }))


        // })
        // console.log(studentid_with_status)

        attendance.map((val) => {
            console.log(val._id.toHexString())
            listOFAttendanceIds.push(val._id.toHexString())
        })



        var updateData = await attendanceMonth.findByIdAndUpdate({ _id: req.params._id }, {
            attendance: listOFAttendanceIds
        },

            { new: true })

        return res.status(200).json({ success: true, data: updateData })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.toString() })
    }
}




//mark single attendane
const addAttendance = async (req, res) => {


    try {
        var { attendanceStatus, rollNumber } = req.body


        const d = await attendanceMonth.findOneAndUpdate(
            { $and: [{ _id: req.params._id }, { attendance: { $elemMatch: { rollNumber: { $eq: rollNumber }, } } }] },



            { $set: { 'attendance.$.status': attendanceStatus } },


            { new: true }


        )
            .populate({
                path: 'attendance',

                // populate:{
                //     path: 'studentId',
                //     model:'Student'
                // }
            })


        return res.status(200).json({
            data: d,

        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }


}

// mark arrival time  
const markArrivalTimeAttendance = async (req, res) => {


    try {
        var {attendanceStatus, rollNumber  , arrivalTime} = req.body


        const d = await attendanceMonth.findOneAndUpdate(
            { $and: [{ _id: req.params._id }, { attendance: { $elemMatch: { rollNumber: { $eq: rollNumber }, } } }] },



            { $set: { 'attendance.$.arrivalTime': arrivalTime,
            'attendance.$.status': attendanceStatus 
            // 'attendance.$.status': attendanceStatus 

        } },


            { new: true }


        )
            .populate({
                path: 'attendance',

                // populate:{
                //     path: 'studentId',
                //     model:'Student'
                // }
            })


        return res.status(200).json({
            success:true,
            data: d,

        })

    } catch (error) {
        return res.status(500).json({success:false, error: error.message })
    }


}
// mark arrival time   end xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// end time attendane
const markEndTimeAttendance = async (req, res) => {


    try {
        var currentDate = new Date()
        var { oldEndTime, rollNumber ,endTime } = req.body

        checkArrarivalTimeisFilled = await attendanceMonth.findOne(
            // {_id:req.params._id}
            { $and: [{ _id: req.params._id }, { attendance: { $elemMatch: { rollNumber: { $eq: rollNumber }, } } }] },
        ).populate({
            path: 'attendance',

            // populate:{
            //     path: 'studentId',
            //     model:'Student'
            // }
        })
  var startTime=''
        let newArray = await checkArrarivalTimeisFilled.attendance.filter(function (el) {
             if(el.rollNumber ===rollNumber){
           if(el.arrivalTime ===''){
            return res.status(400).json({success:false,message:"please first select arrival time"})

           }
           startTime = el.arrivalTime
                
             }
        }
        )
        const startDateFormat = new Date(startTime);
        const timeDifference = calculateTimeDifference(startDateFormat,  new Date(endTime));
console.log(`Hours: ${timeDifference.hours}, Minutes: ${timeDifference.minutes}`);

      
const totalHours= `Hours: ${timeDifference.hours} Minutes: ${timeDifference.minutes}`



        const d = await attendanceMonth.findOneAndUpdate(
            { $and: [{ _id: req.params._id }, { attendance: { $elemMatch: { rollNumber: { $eq: rollNumber }, } } }] },



            { $set: {'attendance.$.endTime':endTime,
            'attendance.$.totalTimeSpend': totalHours
        } },


            { new: true }


        )
            .populate({
                path: 'attendance',

                // populate:{
                //     path: 'studentId',
                //     model:'Student'
                // }
            })


        return res.status(200).json({
            success:true,
            data: d,

        })

    } catch (error) {
        return res.status(500).json({success:false, error: error.message })
    }


}
// end time attendane end cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx






//get all day attendance
const getAllDayAttendance = async (req, res) => {
    try {
        const monthAttendance = await attendanceMonth.find(

        )
            // .populate('attendance')

            .populate({
                path: 'attendance',

                // model: 'Attendance',
                // populate:{
                //     path: 'studentId',
                //     model:'Student'
                // }
            })




        if (!monthAttendance)
            return res.status(400).json({ success: false, message: "not found" })

        console.log(monthAttendance)
        return res.status(200).json({ success: true, data: monthAttendance })
    } catch (error) {
        return res.status(400).json({ success: true, error: error.message })

    }

}
//get all day attendance end xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//get single day attendance
const getSingleDayAttendance = async (req, res) => {
    try {
        const monthAttendance = await attendanceMonth.findById({ _id: req.params._id },

        )
            // .populate('attendance')

            .populate({
                path: 'attendance',
                // populate: { path: 'attendance' },
                // model: 'Attendance',
                populate: {
                    path: 'studentId',
                    model: 'Student'
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
//get single day attendance end xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx










// var markAllpresent = (schools, oldName, name) => {
//     return schools.map(item => {
//         console.log(item)
//         var temp = Object.assign({}, item);
//         if (temp.status === oldName) {
//             temp.status = name;
//         }
//         return temp;
//     });
// }

// var updateSingleStatus = (list, id) => {
//     var newList = []
//     list.map(item => {

//         var temp = Object.assign({}, item);


//         if (item._id.toHexString() === id) {
//             //   console.log(item._id.toHexString() +'aaaa')
//             console.log(item + 'aaaaa')
//             if (temp.status === 'present') {
//                 // item.status = 'absent'


//                 item.set('status', 'absent')
//                 console.log('abs')
//             } else {
//                 // item.status = 'present'
//                 item.set('status', 'present')
//                 console.log('pres')
//             }
//             // if (temp.attendance.studentId.status === oldName) {

//             // }
//         }

//     //       });

//     });
//     return newList;
// }


var updateSingelStatus = (list, oldStatus, newStatus, id) => {
    return list.map(item => {

        var temp = Object.assign({}, item);


        if (temp.studentId.toHexString() === id) {


            if (temp.status === oldName) {
                temp.status = newStatus;
            }
        }
        return temp;
    });
}




//this function used for calcuate time
function calculateTimeDifference(date1, date2) {
    // Calculate the time difference in milliseconds
    const timeDifference = Math.abs(date2 - date1);
  
    // Calculate hours and minutes
    const hours = Math.floor(timeDifference / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((timeDifference % 3600000) / 60000); // 1 minute = 60000 milliseconds
  
    return { hours, minutes };
  }
  //this function used for calcuate time end xxxxxxxxxxxxxxxxxxxxxxxxxxxxx




module.exports = {
    markAttendance: createAttendance,
    addAttendance,
    getSingleDayAttendance,
    getAllDayAttendance,

    markArrivalTimeAttendance,
    markEndTimeAttendance


}