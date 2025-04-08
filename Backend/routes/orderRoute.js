const express = require("express");
const { newOrder, singleOrder, myOrder } = require("../controllers/orderController");
const { isAuthencatedUser, authiorizeRoles } = require("../middleware/Auth");

const router = express.Router();

// Create a new order
router.route("/order/new").post(isAuthencatedUser, newOrder);

// Get logged in user's orders
router.route("/orders/me").get(isAuthencatedUser, myOrder);

// Get single order by ID
router.route("/order/:id").get(isAuthencatedUser,authiorizeRoles("admin"), singleOrder);

router.route("/admin/orders").get(isAuthencatedUser, authiorizeRoles("admin"), getAllOrders);

// Update order status (admin only)
router.route("/admin/order/:id").put(isAuthencatedUser, authiorizeRoles("admin"), updateOrderStatus);

// Delete order (admin only)
router.route("/admin/order/:id").delete(isAuthencatedUser, authiorizeRoles("admin"), deleteOrder);

module.exports = router;
