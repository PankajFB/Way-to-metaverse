const jwt =  require("jsonwebtoken")

const createToken = async() =>{
    const token =  await jwt.sign({_id:"61ee9ff5d5207c195fc1e8cb"},"iamthegreatesmanintheworldrightnowandiamironman",{
        expiresIn:"10 second"
    })
    console.log(`the crated toekn is ${token}`)
    const userVfy =  await jwt.verify(token,"iamthegreatesmanintheworldrightnowandiamironman")
    console.log(userVfy)
}

createToken();