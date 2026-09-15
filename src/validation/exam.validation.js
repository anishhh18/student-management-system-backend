const validateExamCreate = (req,res,next)=>{
  const {examId,name,course,examDate,semester} = req.body
  if(!examId || !name || !course || !examDate || !semester){
    const error =new Error("All fields are required")
    error.statusCode = 400
    return next(error)
  }
  next()
}

const validateExamUpdate = (req,res,next)=>{
  const {examDate}=req.body
  if(examDate === ""){
    const error = new Error("Date is required")
    error.statusCode = 400
    return next(error)
  }
  next()
}