const bcrypt = require("bcryptjs/dist/bcrypt");
const env = require("dotenv").config();
const res = require("express/lib/response");
const async = require("hbs/lib/async");
const mongoose =  require("mongoose")
const jwt =  require("jsonwebtoken")


const empSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    gender: {
        type: String,
        required: true
    },
    youranswer: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens:[{
        token :{
            type:String,
        }
    }]
})



// to make token u need to save the confirmpassword too to make it work properly
// generation the auth token
empSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},"iamtherichestmanintheworldandiamironaman");
        this.tokens = this.tokens.concat({token :token})
        const save= await this.save();
        console.log("working fine....... ")
        res.send("hello there")
        return token;
    }catch(err){
        res.send("the error is" + err);
        console.log("the error is " +err);
    }
}    


// converting the password into hash
empSchema.pre("save", async function(next){
    console.log(`the current password is ${this.password}`)
    this.password = await bcrypt.hash(this.password, 10)
    console.log(`the generated hash is ${this.password}`)
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10)

    // this.confirmpassword = undefined
    next();
})



const Register = new mongoose.model("Register" , empSchema);

module.exports = Register;