;const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const isAuthencatedUser = require("../middleware/Auth");

const router = express.Router();

router.route("/products").get(isAuthencatedUser,getAllProducts);
router.route("/product/new").post(createProduct);
router.route("product/:id").put(updateProduct);
router.route("product/:id").delete(deleteProduct);
router.route("product/:id").get(getProductDetails);

module.exports = router;