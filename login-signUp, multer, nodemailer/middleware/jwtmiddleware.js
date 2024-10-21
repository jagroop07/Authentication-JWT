    const jwt = require('jsonwebtoken')

const verifymiddleware = (req,res,next) => {
    let token = req.headers.token
    try {
        if(!token){
            return res.json({message: "no token present"})
        }
        else{       
            const decode = jwt.verify(token,process.env.SECRET_KEY)
            req.user = decode
            next()
        }
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = verifymiddleware