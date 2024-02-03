//  Redux Imports
import { createSlice } from "@reduxjs/toolkit";

//Store Reducer Slice
export const storeSlice = createSlice({
  name: "store",
  initialState: {
    products: [],
    favourites: [],
    cartItems: [],
    currentProduct: "",
  },
  reducers: {

    // Reducer to add objects to cart
    handleAddToCart: (state, action) => {
      const item = state.products.find((prod) => prod.id === action.payload);
      const itemInCart = state.cartItems.find((item) =>
        item.id === action.payload ? true : false
      );

      return {
        ...state,
        cartItems: itemInCart
          ? state.cartItems.map((item) =>
              action.payload === item.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cartItems, { ...item, quantity: 1 }],
      };
    },
    // Reducer to Remove objects From cart
    handleRemoveFromCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    },
    // Reducer to adjust quantity of objects in cart
    handleAdjustQuantity: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    },

    // Reducer to Fetch all Products
    handleFetchProducts: (state, action) => {
      state.products = action.payload;
    },

    // Reducer to Update Clicked Product
    handleCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },

    // Reducer to Fetch all Favourites
    handleFetchFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

export const {
  handleAddToCart,
  handleAdjustQuantity,
  handleRemoveFromCart,
  handleCurrentProduct,
  handleFetchFavourites,
  handleFetchProducts,
} = storeSlice.actions;

export default storeSlice.reducer;
