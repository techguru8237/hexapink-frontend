import { create } from "zustand";
import { Cart } from "../types";

interface CartState {
  carts: Cart[];
  setCarts: (data: Cart[]) => void;
  removeCarts: (cartIds: string[]) => void;
}

const useCartStore = create<CartState>((set) => ({
  carts: [],
  setCarts: (data: Cart[]) => set(() => ({ carts: data })),
  removeCarts: (cartIds: string[]) =>
    set((state) => ({
      carts: state.carts.filter((cart) => !cartIds.includes(cart.id)),
    })),
}));

export default useCartStore;
