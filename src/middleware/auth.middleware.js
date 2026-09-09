const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req,res,next)=>{
  try{
    const token = req.cookies.token 
    if(!token){
      return res.status(401).json({message:"Unauthorized"})
    }
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
      return res.status(401).json({message:"Unauthorized"})
    }
    console.log(decoded)

    const user = await userModel.findById(decoded.userId)
    if(!user){
      return res.status(401).json({message:"Unauthorized"})
    }

    req.user = user
    next()
  }catch(err){
    console.log(err)
    return res.status(401).json({message:"Invalid or expire token"})
  }

}

module.exports = authMiddleware