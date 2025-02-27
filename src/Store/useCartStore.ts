import { create } from "zustand";
import { Cart } from "../types";

interface CartState {
  carts: Cart[];
  setCarts: (data: Cart) => void;
}

const useCartStore = create<CartState>((set) => ({
  carts: [],
  setCarts: (data: Cart) => set((state) => ({ carts: [...state.carts, data] })),
}));

export default useCartStore;
