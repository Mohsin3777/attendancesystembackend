var d ="bydd mxba xfpf vanf"
const nodemailer = require("nodemailer");
const sendMail1 =async(req,res)=>{
    console.log("0.1");

  try {
    // let testAccount =  await nodemailer.createTestAccount()
    console.log("0.2");
    let transporter =  nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "dillan75@ethereal.email",
          pass: "WW3sjBFE13R3THM946",
        },
    })
console.log("1");
    const info = await transporter.sendMail({

        from: 'spaderent@gmail.com', // sender address
        to: "mohsinaziz377@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      })
      console.log("2");
      console.log("Message sent: %s", info.messageId);
res.json(info)
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}


const sendMail =async(req,res)=>{
    console.log("0.1");

  try {
    // let testAccount =  await nodemailer.createTestAccount()
    console.log("0.2");
    let transporter =  nodemailer.createTransport({
        service: "gmail",
        // port: 465,
        // secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "mohsinaziz377@gmail.com",
          pass: d,
        },
    })
console.log("1");

    const info = {
from:"mohsinaziz377@gmail.com",
to:"designerdope074@gmail.com",
subject:"I am Mohsin Irfan",
text:"Body of the message"
    }

transporter.sendMail(info,(err,result)=>{
    if(err){
        console.log('Error in sending mail ',err)
    }else{
        console.log("mail send successfully ",info)
    }
})

res.json(info)
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}

module.exports= sendMail