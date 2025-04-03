const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/features");

//creating product --Admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.create(req.body); 
    res.status(201).json({
        success:true,
        product
    })
});

//get all product
exports.getAllProducts = catchAsyncErrors(
    async(req,res)=>{
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
