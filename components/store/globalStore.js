import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      cartQtyByUser: {},
      addToCart: (userId, product, quantity) => {
        const { id: productId, price, imgUrls } = product;
        const cartItems = get().cartItems;
        const itemIndex = cartItems.findIndex((item) => item.id === productId);
        if (itemIndex !== -1 && cartItems[itemIndex].userId === userId) {
          cartItems[itemIndex].quantity = quantity;
        } else {
          cartItems.push({
            userId,
            productId,
            price,
            image: imgUrls[0],
            quantity,
          });
        }

        const cartQtyByUser = cartItems.reduce((acc, item) => {
          const { userId, quantity } = item;
          acc[userId] = (acc[userId] || 0) + quantity;
          return acc;
        }, {});

        set({ cartItems, cartQtyByUser });
      },
      removeFromCart: (productId, userId) => {
        const cartItems = get().cartItems.filter(
          (item) => item.userId === userId && item.id !== productId
        );
        const cartQtyByUser = cartItems.reduce((acc, item) => {
          const { userId, quantity } = item;
          acc[userId] = (acc[userId] || 0) + quantity;
          return acc;
        }, {});
        set({ cartItems, cartQtyByUser });
      },
    }),
    {
      name: "cart",
    }
  )
);

export const useCartQtyByUser = () =>
  useCartStore((state) => state.cartQtyByUser);
export const useAddToCart = () => useCartStore((state) => state.addToCart);
export const useRemoveFromCart = () =>
  useCartStore((state) => state.removeFromCart);