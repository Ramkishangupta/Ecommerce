const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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
    sendToken(user,201,res);
})

//login User 
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;
    //checking if user is given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Plese Enter both emai land password ",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid user or Password",401));
    }
    const isPasswordMatched = user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid user or Password",401));
    }
    sendToken(user,200,res);
})

//logout user 
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"user Logout"
    });

})