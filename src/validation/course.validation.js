const validateCourseCreate = (req,res,next)=>{
  const {courseId,name,department} = req.body
  if(!courseId || !name || !department){
    const error = new Error("All fields are required")
    error.statusCode = 400
    return next(error)
  }
  next()
}

const validateCourseUpdate = (req,res,next)=>{
  const {name,department} = req.body
  if(name === ""){
    const error = new Error("Course name is required")
    error.statusCode = 400
    return next(error)
  }
  if(department === ""){
    const error = new Error("Department name is required")
    error.statusCode = 400
    return next(error)
  }
  next()
}

module.exports = {validateCourseCreate,validateCourseUpdate}