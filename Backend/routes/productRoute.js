const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview } = require("../controllers/productController");
const {isAuthencatedUser,authiorizeRoles} = require("../middleware/Auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthencatedUser,authiorizeRoles("admin"),createProduct);
router.route("/admin/product/:id").put(isAuthencatedUser,authiorizeRoles("admin"),updateProduct);
router.route("/admin/product/:id").delete(isAuthencatedUser,authiorizeRoles("admin"),deleteProduct);
router.route("/review").put(isAuthencatedUser,createProductReview);
router.route("/product/:id").get(getProductDetails);
router.route("/reviews").get(getProductReviews);
router.route("/reviews").delete(isAuthencatedUser,deleteProductReview);

module.exports = router;