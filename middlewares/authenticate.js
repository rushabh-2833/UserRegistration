const isAuthenticUser = (req,res,next)=>{

    if(req.session.isValid){
        next()
    }
    else{
        console.log("You are not a Validated User !!!")
        res.redirect('/')
    }



}

export default isAuthenticUser