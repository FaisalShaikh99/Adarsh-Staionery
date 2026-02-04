import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [], // cart me add kiye gaye products ka array
  cartTotalQuantity: 0, // cart products ka total count karne ke liye mean header me cart icon me count ho aur defuallt 0
  cartTotalAmount: 0, // cart ki sab items ka total amount aur default 0
  isLoading: false, // cart se related loading mean jab api se data fetch karte samay loading
  error: null, // error handle => agar api fail ho gayi to error
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // agar cartItems me koi item hai to uski id se check karo ki payload ki id se match hai ya nahi  
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

      // agat item exist hai to
      if (existingItem) {
        if (existingItem.quantity < 10) { // aur item k qty 10 se kam hai
          existingItem.quantity += action.payload.cartQuantity || 1; // to uski qty increase kar sakte
          toast.info("Item quantity updated!", { position: "bottom-left" });
        } else {
          toast.warn("Maximum 10 items allowed!", { position: "bottom-left" });
        }
      } else { // agar item exist nahi hai to cart itemse me new item add karo
        state.cartItems.push({ ...action.payload, quantity: action.payload.cartQuantity || 1 });
        toast.success("Item added to cart!", { position: "bottom-left" });
      }

      // Update cartTotalQuantity when user click on add to cart btn---
      // yaha reduce cartitems mese total qty calculate karta hai
      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      toast.error("Item removed from cart!", { position: "bottom-left" });

      //Update cartTotalQuantity when click remove btn---
      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseQty: (state, action) => {
      const addedItem = state.cartItems.find((item) => item.id === action.payload.id);

      if (addedItem) {
        if (addedItem.quantity < 10) {
          addedItem.quantity += 1;
        } else {
          toast.warn("Maximum 10 items allowed!", { position: "bottom-left" });
        }
      }

      // Update cartTotalQuantity when user click on increase btn ---
      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseQty: (state, action) => {
      const addedItem = state.cartItems.find((item) => item.id === action.payload.id);

      if (addedItem && addedItem.quantity > 1) {
        addedItem.quantity -= 1;
      } else if (addedItem && addedItem.quantity === 1) {
        toast.warn("Cannot decrease below 1!", { position: "bottom-left" });
      }

      // Update cartTotalQuantity when user click on decrease btn ---
      state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0; // - reset qty ---
      state.cartTotalAmount = 0; // - reset amount ---
      localStorage.removeItem("cartItems");
      if (action.payload?.showToast !== false) {
        toast.error("Cart cleared", { position: "bottom-left" });
      }
    },


    cartTotal: (state) => {
      let totalAmount = 0;
      let totalQuantity = 0;

      state.cartItems.forEach((item) => {
        totalAmount += item.price * item.quantity;
        totalQuantity += item.quantity;
      });

      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQuantity;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeItem, increaseQty, decreaseQty, clearCart, cartTotal } = cartSlice.actions;
export default cartSlice.reducer;