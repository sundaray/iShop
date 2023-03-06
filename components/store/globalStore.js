import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (userId, productId, quantity) => {
        const cartItems = get().cartItems;
        const itemIndex = cartItems.findIndex(
          (item) => item.productId === productId
        );
        if (itemIndex !== -1 && cartItems[itemIndex].userId === userId) {
          cartItems[itemIndex].quantity = quantity;
        } else {
          cartItems.push({ userId, productId, quantity });
        }
        set({ cartItems });
      },
      removeFromCart: (productId) => {
        const cartItems = get().cartItems.filter(
          (item) => item.productId !== productId
        );
        set({ cartItems });
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
