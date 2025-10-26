import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const savedCart =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : [];
export interface Cart {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
  max: number;
  photo: string;
  capacity?: string;
  ram?: string;
  color: string;
  url: string;
}

interface CartState {
  cart: Cart[];
  dialog:{
    show:boolean,
    product:Cart|null
  };
}

const initialState: CartState = {
  cart: [],
  dialog: {
    show: false,
    product: null,
  },
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart[]>) => {
      state.cart = action.payload;
    },
    setInCart: (state, action: PayloadAction<Cart>) => {
      const findIndex = state.cart.findIndex(
        (item) => item.id == action.payload.id
      );
      const Item = state.cart[findIndex];
      if (findIndex == -1) {
        if (action.payload.max > 0) {
          state.cart.push(action.payload); 
        
        }
      } else {
        if (Item.quantity < Item.max) {
          Item.quantity++;
        }
      } 
        state.dialog.show=true
          state.dialog.product=Item
    },
    RemoveFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    Increase: (state, action: PayloadAction<number>) => {
      const findIndex = state.cart.findIndex(
        (item) => item.id == action.payload
      );
      const Item = state.cart[findIndex];

      if (Item.quantity < Item.max) {
        Item.quantity++;
      }
    },
    Decrease: (state, action: PayloadAction<number>) => {
      const findIndex = state.cart.findIndex(
        (item) => item.id == action.payload
      );
      const Item = state.cart[findIndex];

      if (Item.quantity > 1) {
        Item.quantity--;
      }
    }, 
    hiddenDialog:(state) => {
state.dialog={
   show: false,
    product: null,
}

    }
  },
});

export const { setInCart, setCart, RemoveFromCart, Increase, Decrease,hiddenDialog } =
  CartSlice.actions;
export default CartSlice.reducer;
