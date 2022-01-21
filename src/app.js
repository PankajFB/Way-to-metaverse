const express = require("express")
const app = express()
const path = require("path")
require("../src/db/conn")
const hbs = require("hbs")
const Register = require("../src/db/models/register")
const { json } = require("body-parser")

const port = process.env.PORT || 5000;

// to resquest json data on get request 
// the ablove line works perfectly fine for the postman but for making it use in the HTML form u have to use the below line toooo
app.use(express.json());
app.use(express.urlencoded({extended:false}))


// the following code is used to render static page on the server
const static_path = path.join(__dirname, "../public")
// app.use(express.static(static_path))

const template_path = path.join(__dirname, "../templates/views")
app.set("views", template_path)

const partials_path = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partials_path)

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index")
})

// create a new user using a post request
app.post("/", async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        // console.log(req.body.firstname)
        // console.log(req.body.lastname)
        // console.log(req.body.password)
        // console.log(req.body.confirmpassword)
        // console.log(req.body.email)
        // console.log(req.body.phone)
        // console.log(req.body.youranswer)
        // console.log(req.body.gender)




if(password===confirmpassword){
    const registeremp = new Register({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        gender: req.body.gender,
        phone : req.body.phone,
        password : req.body.password,
        confirmpassword : req.body.confirmpassword,
        youranswer : req.body.youranswer,
    })

    const registered = await registeremp.save();
    res.render("done")

}else{
    res.send("Password and confirmpassowrd is not same")
}
        
    } catch (e) {
        res.send(e)
    }
})

app.listen(port, () => {
    console.log(`the server is live on ${port}`)
})