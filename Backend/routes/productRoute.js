const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const {isAuthencatedUser,authiorizeRoles} = require("../middleware/Auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthencatedUser,authiorizeRoles("admin"),createProduct);
router.route("/product/:id").put(isAuthencatedUser,authiorizeRoles("admin"),updateProduct);
router.route("/product/:id").delete(isAuthencatedUser,authiorizeRoles("admin"),deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router;