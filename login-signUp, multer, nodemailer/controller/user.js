const User = require("../model/User")
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')


//generate token
const token = (id)=>{
    const secrettoken = jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn: "1 day"
    })

    return secrettoken
}
//postuser
const Signup = async(req,res) => {
    try {
        const {username,password} = req.body

        //creating salt for hasging password and storing it
        const salt = await bcrypt.genSalt(10)
        const encodedpass = await bcrypt.hash(password,salt)

        //validation
        if(!username||!password){
            return res.status(400).send("enter all the required details")
        }

        //finding user
        const user = await User.findOne({username: username})

        //checking whether already exists
        if(user){
            return res.status(409).json({message: "already registered"})  //status_code 409 is for conflicts...means creating resources that already exists
        }

        //creating URL for image
        const url = `http://localhost:8080/image/${req.file.filename}`

        //replacing blank spaces in the URL
        const encodedurl = url.replace(/\s/g, '%20')

        //Creating user
        await User.create({
            username,
            password: encodedpass,
            image: encodedurl
        })

        //when user is created successfully
        return res.status(200).json({message: "saved successfully"})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//getuser
const getuser = async(req,res) => {
    try {
        let {user} = req
        const james = await User.findOne({_id: user.id})
        const userr = await User.find({})
        return res.json({userr, james})
    } catch (error) {
        return res.send(error.message)
    }
}

//deleteuser
const deleteuser = async(req,res)=>{
    try {
        let {id} = req.params
        await User.deleteOne({_id:id})
        return res.send("user deleted succesfully")
    } catch (error) {
        return res.send(error.message)
    }
}

//putuser
const updateuser = async(req,res) => {
    try {
        let {id} = req.params
        let {username, password} = req.body
        const user = await User.findOneAndReplace({_id:id},{
            username: username,
            password: password
        })
        return res.send(user)
    } catch (error) {
        return res.send(error.message)
    }
}

//patchuser
const patchhuser = async(req,res) => {
    try {
        let {id} = req.params
        let {username, password} = req.body
        const user = await User.updateOne({_id:id},{
            $set:{username: username, password: password , image:  `http://localhost:8080/image/${req.file.filename}`}
        })
        return res.send(user)
    } catch (error) {
        return res.send(error.message)
    }
}

//login
const loginn = async(req,res) => {
    try {
        let {username, password} = req.body
        
        //validation
        if(!username||!password){
            res.status(400).send("fill all the required fields")
        }

        //finding user
        const user = await User.findOne({username: username})
        
        //if user not available
        if(!user){
            return res.status(404).send("user not found")
        }

        //if available and password is correct
        if(user&&(await bcrypt.compare(password , user.password))){
            const secret_token = token(user._id)
            return res.status(200).json({secret_token,user, message: "login successfully"})
        }
        //if password is wrong
        else{
            return res.status(403).json({message: "wrong password"})
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//const navigate = useNavigate().........................navigate('/login')

//send mail
const sendmail = async(req,res) => {
    let {email} = req.body
    let {user} = req
    const userd = await User.findOne({id: user._id})
    try {
        let mailTransporter =
        nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: 'jagroop.1408@gmail.com',
                    pass: 'orff bqur yrck oyfd'
                }
            }
        );
 
        let mailDetails = {
            from: 'jagroop.1408@gmail.com',
            to: email,
            subject: 'Test mail',
            text: 'horr kidaa bro.....lasiii pittiiii a'
        };

        mailTransporter
            .sendMail(mailDetails,
                function (err, data) {
                    if (err) {
                        return res.send('Error Occurs');
                    } else {
                        return res.send('Email sent successfully');
                    }
                });
        
        return res.send(`welcome ${userd.username}`)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    Signup,
    getuser,
    deleteuser,
    updateuser,
    patchhuser,
    loginn,
    sendmail
}