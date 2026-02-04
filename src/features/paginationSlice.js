import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage : "n",
  totalItems : 0, // default value 0
  totalPage : 0,  // default value 0
  pageSize : 8,   // default value 8 
  nextPage : false ,
  prevPage  : false
}

const paginationSlice = createSlice({
    name : "pagination",
    initialState,
    reducers : {
      
       // yaha hamne do total page ki functionality kikhi hai kyunki jab ham productData
        setCurrentPage  : (state, action) => {
         state.currentPage = action.payload;
         state.nextPage = state.currentPage < state.totalPage; // crnt page total page se kam hai to next page kar sakte
         state.prevPage = state.currentPage > 1; // crnt page 1 se bada hai to prev page kar sakte
        },  
        setTotalItems : (state, action) => {
         state.totalItems = action.payload; // yaha  action.payload Redux Toolkit me reducer ke andar aane wala data hota hai — jo ham dispatch karte ho.
         state.totalPage = Math.ceil (action.payload / state.pageSize) // math.ceil() function se total items ko page size se divide karke total pages nikalte hai 
        }, // math.ceil() decimal value ko round up karta hai jisse total pages ka sahi count milta hai
        setPageSize : (state, action) => {
         state.pageSize = action.payload;
         state.totalPage = Math.ceil(state.totalItems / action.payload);
        }
    }
});

export const {setCurrentPage, setTotalItems, setPageSize} = paginationSlice.actions;
export default paginationSlice.reducer;