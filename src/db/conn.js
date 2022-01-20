const mongoose =  require("mongoose")

mongoose.connect("mongodb://localhost:27017/empdata", {

})
.then(()=>{
    console.log("database connection is successfull")
}).catch((e)=>{
    console.log(e)

})

