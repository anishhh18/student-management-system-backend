require("dotenv").config()
const server = require("./app")
const ConnectDB = require("./db/db")

ConnectDB()

server.listen(3000,()=>{
  console.log("Server is running on port 3000")
})