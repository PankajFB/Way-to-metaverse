// empSchema.pre("save", async function(next){
//     console.log(`the current password is ${this.password}`)
//     this.password = await bcrypt.hash(this.password, 10)
//     console.log(`the generated hash is ${this.password}`)
//     this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10)

//     // this.confirmpassword = undefined
//     next();
// })




const bcrypt = require("bcryptjs");
const async = require("hbs/lib/async");

const pass1 = "69"
const cpass = "3"

const hashmaker = async ()=>{

    // const hash = await bcrypt.hash(pass1,10);

    // the true has for pk1@gmail.com
    // const hash = "$2a$10$rZNBBYvPvnQZNANLVkp9YetQYxlIH1daCe11jI5yQGdSpirt1xO1."

    const hash = "$2a$10$VqAN9M7UD3k/mNy3Qdu0C.e7.a497Pt4FJKyYIRBlwqoRt6c1lYYe"


    console.log(hash)

    const isMatch = await bcrypt.compare(cpass,hash)
    console.log("match password :"+isMatch)

}

hashmaker(pass1);
