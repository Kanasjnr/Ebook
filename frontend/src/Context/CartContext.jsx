import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../Reducers/CartReducer";
import { getUserCart, addToCartAPI, removeFromCartAPI, clearCartAPI } from "../Services";
import { toast } from "react-toastify";

const cartInitialState = {
    cartList: [],
    total: 0,
    loading: false
}

const CartContext = createContext(cartInitialState)

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    // Load cart from backend on mount
    useEffect(() => {
        const loadCart = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    dispatch({ type: "SET_LOADING", payload: true });
                    const cartData = await getUserCart();
                    const total = cartData.cartList.reduce((sum, item) => sum + item.price, 0);
                    dispatch({
                        type: "LOAD_CART",
                        payload: {
                            products: cartData.cartList,
                            total: total
                        }
                    });
                } catch (error) {
                    // Cart not found is normal for new users
                    if (!error.message.includes("Cart not found")) {
                        console.error("Error loading cart:", error);
                    }
                } finally {
                    dispatch({ type: "SET_LOADING", payload: false });
                }
            }
        };
        loadCart();
    }, []);

    const addToCart = async (product) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            await addToCartAPI(product.id);
            
            const updatedList = state.cartList.concat(product);
            const updatedTotal = state.total + product.price;

            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    products: updatedList,
                    total: updatedTotal
                }
            });
            
            toast.success("Item added to cart!");
        } catch (error) {
            toast.error(error.message || "Failed to add item to cart");
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    const removeFromCart = async (product) => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            await removeFromCartAPI(product.id);

            const updatedList = state.cartList.filter(item => item.id !== product.id);
            const updatedTotal = state.total - product.price;

            dispatch({
                type: "REMOVE_FROM_CART",
                payload: {
                    products: updatedList,
                    total: updatedTotal
                }
            });
            
            toast.success("Item removed from cart!");
        } catch (error) {
            toast.error(error.message || "Failed to remove item from cart");
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    const clearCart = async () => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            await clearCartAPI();
            
            dispatch({
                type: "CLEAR_CART",
                payload: {
                    products: [],
                    total: 0
                }
            });
            
            toast.success("Cart cleared!");
        } catch (error) {
            toast.error(error.message || "Failed to clear cart");
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    const value = {
        cartList: state.cartList,
        total: state.total,
        loading: state.loading,
        addToCart,
        removeFromCart,
        clearCart
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context
}