//import 

const projects = require('../Models/projectSchema');



 exports.addProjects= async(req , res)=>{
    console.log('inside add projects');  
    const userId = req.payload
    console.log(userId);
    
    const projectImage = req.file.filename
    console.log(projectImage)

    const {title,language,github,website,overview}=req.body
    console.log(title,language,github,website,overview,projectImage,userId);
    
    try {
        
    const existingUser = await projects.findOne({github})

    if(existingUser){
      res.status(409).json( "Project already exists");
    }else{
      const newProject = new projects({
        title,
        language,
        github,
        website,
        overview,
        projectImage,
        userId
      })
      await newProject.save()
      res.status(200).json(newProject)
    }
    } catch (err) {
       res.status(401).json('upload failed due to ',err)
    }
      
  }


  //home projects
 exports.getHomeProjects = async (req,res)=>{
     try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
     } catch (err) {
        res.status(401).json('request failed due to ',err)
     }
 }

 //all projects

 exports.getAllProjects = async (req,res)=>{
  const searchkey = req.query.search
  console.log(searchkey);
  const query={
     language:{
      //regular expresssion , option  i it remove the case sensitivity
      $regex:searchkey,$options:'i'
     }
  }
  try {
     const allProjects = await projects.find(query)
     res.status(200).json(allProjects)
  } catch (err) {
     res.status(401).json('request failed due to ',err)
  }
}


//get user projects

exports.getUserProjects = async(req,res)=>{
  try {
    const userId = req.payload
    const userProjects = await projects.find({userId})
    res.status(200).json(userProjects)
  } catch (err) {
    res.status(401).json('request failed due to ',err)
  }
}

//edit project
exports.editUserProject = async(req,res)=>{
  const {id} = req.params
  const userId = req.payload
  const{title,language,github,website,overview,projectImg} = req.body
  const uploadedProjectImage = req.file?req.file.filename:projectImg

  try {
     const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImg:uploadedProjectImage,userId},{new:true})
    
    
    await updateProject.save()
    res.status(200).json(updateProject)

  } catch (err) {
    res.status(401).json(err)
  }
}

//delete project

exports.deleteUserProject = async(req,res)=>{
  const {id}=req.params;
  try {

    const removeProject = await projects.findByIdAndDelete({_id:id})
    res.status(200).json(removeProject)
    
  } catch (err) {
    res.status(401).json(err)
  }
}