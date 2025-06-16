import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  nickname: string;
  faceImagePath: string;
  faceEncoding: string;
  pin: string;
}

interface PaymentState {
  orderId: string | null;
  amount: number | null;
  orderName: string | null;
  customerKey: string | null;
  billingKey: string | null;
  accessToken: string | null;
  paymentType: 'qr' | 'face' | null;
  user: User | null;
  confidence: number | null;
  setPaymentDetails: (details: Partial<PaymentState>) => void;
  setUser: (user: User, confidence: number) => void;
  clearPaymentDetails: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      orderId: null,
      amount: null,
      orderName: null,
      customerKey: null,
      billingKey: null,
      accessToken: null,
      paymentType: null,
      user: null,
      confidence: null,
      setPaymentDetails: (details) => set((state) => ({ ...state, ...details })),
      setUser: (user, confidence) => set({ user, confidence }),
      clearPaymentDetails: () =>
        set({
          orderId: null,
          amount: null,
          orderName: null,
          customerKey: null,
          billingKey: null,
          accessToken: null,
          paymentType: null,
          user: null,
          confidence: null,
        }),
    }),
    {
      name: 'payment-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
