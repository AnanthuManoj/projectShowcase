const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req,res,next)=>{
   console.log('inside middleware');
   const token = req.headers['authorization'].split(' ')[1]
   console.log(token);
   try{
      const jwtResponse = jwt.verify(token,'keyforyou123')
      console.log(jwtResponse);
      req.payload = jwtResponse.userId
      next()
   }catch(err){
       res.status(401).json('authorization failed...... please login')
   }
}

module.exports = jwtMiddleWare
