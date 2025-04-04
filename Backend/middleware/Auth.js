const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthencatedUser = catchAsyncError(async (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    
    const decodedData = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    
    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }

    next();
});

module.exports = isAuthencatedUser;