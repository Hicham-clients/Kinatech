import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const savedCart = () => {
  try {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("cart");
      if (!data) return;
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) throw new Error("il ya un probleme");
      for (const item of parsed) {
        if (typeof item != "object" || !item.id) {
          throw new Error("il ya un probleme");
        }
      }
      return parsed;
    }
  } catch (err: unknown) {
    sessionStorage.setItem("cart", JSON.stringify([]));
    return [];
  }
};

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
  dialog: {
    show: boolean;
    product: Cart | null;
  };
  showSummary: boolean;
  /**
   * Passe à true juste après une commande enregistrée. Le layout du panier
   * masque ses enfants dès que le panier est vide : sans ce drapeau, vider
   * le panier après la commande remplacerait l'écran de confirmation par
   * la page "panier vide".
   */
  orderConfirmed: boolean;
}

const initialState: CartState = {
  cart: savedCart()||[],
  dialog: {
    show: false,
    product: null,
  },
  showSummary: true,
  orderConfirmed: false,
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
          state.dialog.show = true;
          state.dialog.product = action.payload;
          state.cart.push(action.payload);
        }
      } else {
        if (Item.quantity < Item.max) {
          Item.quantity++;
          state.dialog.show = true;
          state.dialog.product = Item;
        }
      }
    },
    RemoveFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.cart));
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
    hiddenDialog: (state) => {
      state.dialog = {
        show: false,
        product: null,
      };
    },
    ViderCart: (state) => {
      state.cart = [];
        sessionStorage.setItem("cart", JSON.stringify([]))

    },
    ToggleSummary: (state, action: PayloadAction<boolean>) => {
      state.showSummary = action.payload;
    },
    // Commande enregistrée : on garde la page de confirmation visible
    // même si le panier vient d'être vidé.
    setOrderConfirmed: (state, action: PayloadAction<boolean>) => {
      state.orderConfirmed = action.payload;
    },
  },
});

export const {
  setInCart,
  ToggleSummary,
  setCart,
  RemoveFromCart,
  Increase,
  Decrease,
  hiddenDialog,
  ViderCart,
  setOrderConfirmed,
} = CartSlice.actions;
export default CartSlice.reducer;
