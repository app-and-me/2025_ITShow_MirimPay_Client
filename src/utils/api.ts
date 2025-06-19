import axios from 'axios';
import { useUiStore } from '../store/ui';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    useUiStore.getState().setLoading(true);
    return config;
  },
  (error) => {
    useUiStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    useUiStore.getState().setLoading(false);
    return response;
  },
  (error) => {
    useUiStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

interface PaymentQrPayload {
  amount: number;
  orderName: string;
}

interface PaymentQrResponse {
  paymentData: {
    orderId: string;
    amount: number;
    orderName: string;
    timestamp: number;
  }
  success: boolean;
}

export const postUserPaymentQr = async (payload: PaymentQrPayload): Promise<PaymentQrResponse> => {
  const response = await apiClient.post('/users/payment/qr', payload);
  return response.data;
};

export const getUserMe = async (accessToken: string) => {
  const response = await apiClient.get('/users/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

interface PaymentProcessPayload {
  orderId: string;
  amount: number;
  orderName: string;
  billingKey: string;
  customerKey: string;
  pin: string;
}

export const postPaymentProcess = async (payload: PaymentProcessPayload, accessToken: string) => {
  const response = await apiClient.post('/users/payment/process', payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

interface FaceRecognizeParams {
  faceImage: string;
}

interface FaceRecognizeSuccessResponse {
  success: true;
  message: string;
  user: {
    id: number;
    nickname: string;
    faceImagePath: string;
    faceEncoding: string;
    pin: string; 
  };
  confidence: number;
}

interface FaceRecognizeErrorResponse {
  success: false;
  message: string;
  user?: null;
  confidence?: null;
}

export type FaceRecognizeResponse = FaceRecognizeSuccessResponse | FaceRecognizeErrorResponse;

export const getFaceRecognize = async (params: FaceRecognizeParams): Promise<FaceRecognizeResponse> => {
  const response = await apiClient.post('/users/face/recognize/base64', {
    faceImage: params.faceImage
  }, {
    headers: { 'Content-Type': 'application/json' }
  });
  return response.data;
};

interface PaymentFaceBase64Payload {
  amount: number;
  orderName: string;
  faceImage: string;
  pin: string;
}

export const postPaymentFaceBase64 = async (payload: PaymentFaceBase64Payload) => {
  const response = await apiClient.post('/users/payment/face/base64', payload);
  return response.data;
};


interface PurchaseItem {
  productId: string;
  quantity: number;
}

interface ProductsPurchasePayload {
  items: PurchaseItem[];
}

export const postProductsPurchase = async (payload: ProductsPurchasePayload) => {
  const response = await apiClient.post('/products/purchase', payload);
  return response.data;
};

export interface ProductDetails {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export const getProductById = async (productId: string): Promise<ProductDetails> => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};
