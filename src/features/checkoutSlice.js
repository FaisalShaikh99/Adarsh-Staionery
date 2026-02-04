import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : { fullName: "", email: "", mobileNo: "" },  // yaha empty strings ke sath suruaat hoti hai agar local storage me userDetail nahi hai to

  deliveryAddress: localStorage.getItem("deliveryAddress")
    ? JSON.parse(localStorage.getItem("deliveryAddress"))
    : { address: "", cityPin: "" }, // yaha empty strings ke sath suruaat hoti hai agar local storage me deliveryAddress nahi hai to

  paymentMethod: localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod") // No JSON.parse use nahi hoga beacause paymentmethod local storage me JSON string nahi sirf ordinary (sadharan) String hai
    : "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      // yaha naya payload existing userDetails ke sath merge hojayega
      state.userDetails = { ...state.userDetails, ...action.payload };
      localStorage.setItem("userDetails", JSON.stringify(state.userDetails));
    },
    setDeliveryAddress: (state, action) => {
      // yaha naya payload existing deliveryAddress ke sath merge hojayega
      state.deliveryAddress = { ...state.deliveryAddress, ...action.payload };
      localStorage.setItem("deliveryAddress", JSON.stringify(state.deliveryAddress));
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload; 
      localStorage.setItem("paymentMethod", action.payload); 
    },
    clearCheckoutPage: (state) => {
      state.userDetails = { fullName: "", email: "", mobileNo: "" }; // Reset value of all properties
      state.deliveryAddress = { address: "", cityPin: "" };  // Reset value of all properties
      state.paymentMethod = ""; // Reset to empty string
      localStorage.removeItem("userDetails");
      localStorage.removeItem("deliveryAddress");
      localStorage.removeItem("paymentMethod");
    },
  },
});

export const { setUserDetails, setDeliveryAddress, setPaymentMethod, clearCheckoutPage } = checkoutSlice.actions;
export default checkoutSlice.reducer;