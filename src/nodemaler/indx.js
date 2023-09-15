const express = require('express')
const app = express()

const mailController =require('../nodemaler/node_mailer_controller')

app.post('/mail',mailController)


const start =async(req,res)=>{
    try {
        app.listen(5000, ()=>{
            console.log('Server is running at 5000')
        })
    } catch (error) {
        
    }
}

start()

