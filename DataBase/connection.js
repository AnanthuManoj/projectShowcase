//import mongoose
const mongoose = require('mongoose')

//get the connection string
const connectionString = process.env.DATABASE

//connect server with mongodb
mongoose.connect(connectionString).then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.error(`could not connect ${err}`)
})