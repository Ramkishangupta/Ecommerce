const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/features");

//creating product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    req.body.user = req.user.id; 
    const product = await Product.create(req.body); 
    res.status(201).json({
        success:true,
        product
    })
});

//get all product
exports.getAllProducts = catchAsyncErrors(
    async(req,res,next)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query; 
    res.status(201).json({
        success:true,
        products,
        productCount
    })
}
);

//update Product -- Admin

exports.updateProduct = catchAsyncErrors(async(req,res)=>{
    let product = Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found",
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
})

//delete product 
exports.deleteProduct=catchAsyncErrors(
    async(req,res,next)=>{

        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(500).json({
                success:false,
                message:"Product not Found",
            })
        }
    
        await product.remove();
        res.status(200).json({
            uccess:true,
            message:"Product Deleted Successfully"
        })
    }
)

//get single Product 
exports.getProductDetails = catchAsyncErrors(
    async(req,res,next)=>{
        const product = await Product.findById(req.params.id);
        if(!product){
            return next(new ErrorHandler("Product not found",404));
        }
    
        res.json(200).json({
            success:"true",
            product,
        })
    }
);

//Create New Reviews or update the review 
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product = await Product.findById(productId);
    const isReviewed = product.find(rev => rev.user.toString()===req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach(rev =>{
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
     
    let avg = 0;
    product.ratings = product.reviews.forEach((rev)=>{
        avg = avg + rev.rating;
    });
    
    product.ratings = avg  / product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.stattus(200).json({
        success:true,
    })
})
