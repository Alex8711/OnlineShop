import HttpError from "../models/http-error.js";


const admin = (req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next()
    }else{
        return next(new HttpError("Not authorized as an admin", 401));
    }
}

export default admin;