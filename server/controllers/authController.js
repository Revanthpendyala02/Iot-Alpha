const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

 async function login(req, res) {
     const {  email, password } = req.body

    if ( !email || !password ) {
        return res.status(400).json({
            "message": "Invalid Input"
        })
    }
    
    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(400).json({
            "message": "Email is not registered please register"
        })

    }
    const checkPassword = await bcrypt.compare(password,existingUser.password)

    if(!checkPassword){
        return res.status(400).json({
            "message" : "Wrong password"
        })
    }
    const token = jwt.sign({id:existingUser._id},process.env.SECRET_KEY)


    res.status(200).json({
        "message": "login successfull",
        "Token" : token
    })

}

async function register(req, res) {

    console.log("1......")
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
        return res.status(400).json({
            "message": "Invalid Input"
        })
    }
    
    console.log("2......")
    const existingUser = await User.findOne({ email: email })

    if (existingUser) {
        return res.status(400).json({
            "message": "Email already exists"
        })

    }


    const encryptPassword = await bcrypt.hash(password, 4)
    const newUser = await User.create({
        name: name,
        email: email,
        password: encryptPassword,
        role: role
    })

    
    console.log("4......")
    res.status(200).json({
        "message": "User registered Successfully"
    })
}

module.exports = {
    login,
    register
}