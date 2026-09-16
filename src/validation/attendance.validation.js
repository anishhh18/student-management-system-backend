const validateattendanceCreate = (req,res,next)=>{
  const {student,date,course,status} = req.body
  if(!student||!date||!course||!status){
    const error = new Error("All fields are required")
    error.statusCode = 400
    return next(error)
  }
  next()
}

const validateattendanceUpdate = (req,res,next)=>{
  const {status} = req.body
  if(status === ""){
    const error = new Error("Status is required")
    error.statusCode = 400
    return next(error)
  }
  if(status && status !== "present" && status !== "absent" && status !== "late"){
    const error = new Error("Invalid status value")
    error.statusCode = 400
    return next(error)
  }
  next()
}

module.exports = {validateattendanceCreate,validateattendanceUpdate}