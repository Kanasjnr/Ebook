import authService from "./authService";
import dataService from "./dataService";
import productService from "./productservice";
import cartService from "./cartService";
import orderService from "./orderService";
import adminService from "./adminService";

// Export service objects
export { authService, dataService, productService, cartService, orderService, adminService };

// For backward compatibility, also export individual functions
export const { login, register, registerAdmin, logout } = authService;
export const { getUser } = dataService;
export const { getProductList, getProduct, getFeaturedList } = productService;
export const { getUserCart, addToCartAPI, removeFromCartAPI, clearCartAPI } = cartService;
export const { placeOrder, getUserOrders, getOrderById } = orderService;
export const { createEbook, updateEbook, checkAdminStatus } = adminService;