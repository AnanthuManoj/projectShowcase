//logic to resolve the request

// import model
const users = require('../Models/userSchema')

//import jwt
const jwt = require('jsonwebtoken')


// logic for register
exports.register = async (req,res)=>{
      //extract data form request body - json in index.js file convert json data into javaScript object
    console.log(req.body);
    const {username,email,password} = req.body 
    
  try { 
    const existUser = await users.findOne({email})//the users here is the name of the model not the name of collection
    if(existUser){
        res.status(406).json('User Already Exist Please Login')
    }else{
        //create an object for the model
    const newUser = new users({
        username,
        email,
        password,
        github:"",
        linkedin:"",
        profile:""
    }) 

    //save function in mongoose - to permanently store this data in mongodb

    await newUser.save()
        res.status(200).json(newUser)
    }
      }catch(err){
         res.status(401).json('registration failed due to',err) 
      }
}

// logic for login
exports.login = async (req,res)=>{
  const {email,password} = req.body


  try{
  const logUser = await users.findOne({email,password})   
  
  if(logUser){
    const token = jwt.sign({userId:logUser._id},'keyforyou123')
    res.status(200).json({
      token,
      logUser
    })
  }else{
    res.status(406).json('incorrect email or password')
  }
  }catch(err){
    res.status(401).json(`login failed due to${err}`)
  }

}




//update profile

exports.updateProfile = async (req,res)=>{
  const {id} = req.params
  const{ username,email,password,github, linkedin, profile} = req.body
  const uploadedProfileImage = req.file?req.file.filename:profile

  try {
    const updateProfile = await users.findByIdAndUpdate({_id:id},{username,email,password,github, linkedin, profile:uploadedProfileImage},{new:true})
    await updateProfile.save()
    res.status(200).json(updateProfile)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.getUser=async(req , res)=>{
  try {
    const {id} = req.params
    const userData = await users.find({_id:id})
    res.status(200).json(userData)
  } catch (err) {
    res.status(401).json('request failed due to ',err)
  }
}