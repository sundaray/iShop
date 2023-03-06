import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (productId, quantity) => {
        const cartItems = get().cartItems;
        const itemIndex = cartItems.findIndex(
          (item) => item.productId === productId
        );
        if (itemIndex !== -1) {
          cartItems[itemIndex].quantity = quantity;
        } else {
          cartItems.push({ productId, quantity });
        }
        set({ cartItems });
      },
      removeFromCart: (productId) => {
        const cartItems = get().cartItems.filter(
          (item) => item.productId !== productId
        );
        set({ cartItems });
      },
      totalCartQty: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    {
      name: "cart",
    }
  )
);

export const useCartItems = () => useCartStore((state) => state.cartItems);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () =>
  useCartStore((state) => state.removeFromCart);
export const useTotalCartQty = () =>
  useCartStore((state) => state.totalCartQty());
