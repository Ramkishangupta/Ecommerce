const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");

//Register User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}= req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is sample url",
            url:"ProfilepicUrl"
        }
    });

    const token = user.getJWTToken();
    res.status(201).json({
        success:true,
        token,
    })
})

//login User 
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    //checking if user is given password and email both
    if(!email && !password){
        return next(new ErrorHandler("Plese Enter both emai land password ",400))
    }
    const user = User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid user or Password",401));
    }
    const isPasswordMatched = user.comparePassword();
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid user or Password",401));
    }

    const token = user.getJWTToken();
    res.status(201).json({
        success:true,
        token,
    })
}

)