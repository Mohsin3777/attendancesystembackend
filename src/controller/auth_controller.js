const Student =require('../model/student')



const createStudent =async (req, res) => {
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
}


module.exports = {
    createStudent
}