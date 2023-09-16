const Student = require('../model/student')

const getListOFStudents= async(req,res)=>{
    try {
    
  
  
 
     var data =await Student.find()

     if(!data)
     return res.status(400).json({message:"Not found"})
  
     
  
     
     return res.status(200).json({ success: true, data: data })
    } catch (error) {
      return res.status(400).json({ success: true, error: error.message })
    }
  
   
  }


module.exports ={
    getListOFStudents
}