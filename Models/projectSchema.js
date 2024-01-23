//import mongose
const mongoose = require('mongoose')

//project schema
const projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    github:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    projectImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

//create model
const projects = mongoose.model('projects',projectSchema)

//exports model
module.exports = projects