const Student = require('../model/student')

const getListOFStudents = async (req, res) => {
    try {




        var data = await Student.find()

        if (!data)
            return res.status(400).json({ message: "Not found" })




        return res.status(200).json({ success: true, data: data })
    } catch (error) {
        return res.status(400).json({ success: true, error: error.message })
    }


}


//update user

const updateUserDetails= async(req,res)=>{
    try {
      var {name,email, registered} =req.body


     var registerStudent =await Student.findOneAndUpdate({
      _id:req.params._id
     },
     {
        name:name,
        email:email,
      registered:registered
     },
     {
      new:true
     }
     
     )
  
    //  await registerStudent.save()
  
     
     return res.status(200).json({ success: true, data: registerStudent })
    } catch (error) {
      return res.status(400).json({ success: true, error: error.message })
    }
  
   
  }

  const attendanceMonth = require('../model/month_attendance')
  const Prac= async(req,res)=>{

try {
  var data =await attendanceMonth.find()

  res.status(200).json({data:data})

} catch (error) {
  return res.status(400).json({ success: true, error: error.message })
}
  }

module.exports = {
    getListOFStudents,
    updateUserDetails,
    Prac
}