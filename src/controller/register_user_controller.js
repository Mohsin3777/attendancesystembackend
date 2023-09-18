const attendanceMonth = require('../model/month_attendance')
const Attendance = require('../model/attendance');
const Student = require('../model/student')



//register students
const registerStudent= async(req,res)=>{
    try {

    var data =req.body
      var stu = await Student.findById({_id:req.params._id})
  
      if (!stu) {
          return res.status(400).json({ message: "Not Found" })
      }
    //   if (stu.registered === true) {
    //     return res.status(400).json({ message: "Already registered" })
    // }


   var   upsateUserRegisterStatus =await  Student.findOneAndUpdate(
    {_id:req.params._id},
   { registered:data.registered},
   {new:true}
   )

  //  if(checkALreadyRegisterorNot)
  //  return res.status(400).json({ message: "ALready registered" })
  
    //  var registerStudent = Attendance({
    //   studentId:req.params._id,
    //   status:'absent',
    //   date:Date.now(),
    //   registered:data.registered
  
    //  })
  
    //  await registerStudent.save()
  
     
     return res.status(200).json({ success: true, data: upsateUserRegisterStatus })
    } catch (error) {
      return res.status(400).json({ success: true, error: error.message })
    }
  
   
  }


  const getListOfregisterStudent= async(req,res)=>{
    try {
    
  
  
 
    //  var data =await Student.find({ registered: true })
    var data =await Student.find()

     if(!data)
     return res.status(400).json({message:"Not found"})
  
     
  
     
     return res.status(200).json({ success: true, data: data })
    } catch (error) {
      return res.status(400).json({ success: true, error: error.message })
    }
  
   
  }

  module.exports = {
   
    registerStudent,
    getListOfregisterStudent,
   
}