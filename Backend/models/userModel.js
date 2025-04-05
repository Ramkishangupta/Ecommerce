const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength :[30,"name can not exceed 30 characters"],
        minLength :[4,"Name is not less than 4 charcters"],
    },
    email:{
        type:String,
        required:[true,"enter your email"],
        validate:[validator.isEmail,"Enter a valid Email"],
    },
    password:{
        type:String,
        required:[true,"Enter your password"],
        minLength:[8,"Password should be greater than 8"],
        select:false,
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken: String,
    resetPasswordExpire : Date,
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

//compare passsword
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generation password reset token
userSchema.methods.getResetPasswordToken = function(){
    //generation token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() +15*60*1000;

    return resetToken;
}
module.exports = mongoose.model("User",userSchema);