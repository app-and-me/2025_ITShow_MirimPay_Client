import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  items: Array<{ productId: string; quantity: number; name: string; price: number; stock?: number }>; // Add stock to item
  addToCart: (productId: string, name: string, price: number, stock?: number) => void; // Modify addToCart
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (productId, name, price, stock) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === productId);
          if (existingItem) {
            const newQuantity = existingItem.stock ? Math.min(existingItem.quantity + 1, existingItem.stock) : existingItem.quantity + 1;
            return {
              items: state.items.map((item) =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
              ),
            };
          }
          return { items: [...state.items, { productId, quantity: 1, name, price, stock }] }; // Add stock to new item
        }),
      removeFromCart: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.productId === productId) {
              const newQuantity = item.stock ? Math.min(Math.max(0, quantity), item.stock) : Math.max(0, quantity);
              return { ...item, quantity: newQuantity };
            }
            return item;
          }).filter(item => item.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
