const roleMiddleware = (allowedRole)=>{
  return (req,res,next)=>{
    const {role} = req.user
    if(!allowedRole.includes(role)){
      return res.status(403).json({message:"Access denied"})
    }
    next()
  }
}

module.exports = roleMiddleware