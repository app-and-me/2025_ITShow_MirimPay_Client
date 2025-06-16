import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import ProductItem from "../components/ProductItem";
import Footer from "../components/Footer";
import { useCartStore } from "../store/cart";
import { getProductById } from '../utils/api';
import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface Product {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const CartContainer = styled.div`
  padding: 10rem 1.5rem 10rem;
  width: 100%;
  margin: 0 auto;
  user-select: none;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const ProductWrapper = styled.div`
  margin: 0 1rem;
`;

const CartTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  user-select: none;
  padding: 1rem;
`;

const CartHeader = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;
export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCartStore();

  console.log("Cart items:", items);

  const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const isProcessingScanRef = useRef(false);
  const lastScannedBarcodeRef = useRef<string | null>(null);
  const scanCooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScanSuccess = async (decodedText: string) => {
      const barcode = decodedText;

      if (isProcessingScanRef.current ||
          (lastScannedBarcodeRef.current === barcode && scanCooldownTimeoutRef.current)) {
        return;
      }

      isProcessingScanRef.current = true;
      lastScannedBarcodeRef.current = barcode;

      if (scanCooldownTimeoutRef.current) {
        clearTimeout(scanCooldownTimeoutRef.current);
      }

      try {
        const productDetails = await getProductById(barcode);
        const { items: currentItems, addToCart: currentAddToCart, updateQuantity: currentUpdateQuantity } = useCartStore.getState();
        const existingItem = currentItems.find(item => item.productId === productDetails.id);

        if (existingItem) {
          if (existingItem.quantity < productDetails.quantity) {
            currentUpdateQuantity(productDetails.id, existingItem.quantity + 1);
          }
        } else {
          currentAddToCart(productDetails.id, productDetails.name, productDetails.price, productDetails.quantity);
        }
      } catch (error) {
        console.error(`Error processing barcode ${barcode}:`, error);
      } finally {
        scanCooldownTimeoutRef.current = setTimeout(() => {
          scanCooldownTimeoutRef.current = null;
        }, 2000);
        isProcessingScanRef.current = false;
      }
    };

    const onScanFailure = (error: string) => {
    };

    if (document.getElementById("qr-reader")) {
      const config = {
        fps: 10,
        qrbox: 250,
        videoConstraints: {
          facingMode: "environment"
        },
        useBarCodeDetectorIfSupported: false
      };
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        config,
        false
      );
      html5QrcodeScannerRef.current = scanner;
      scanner.render(onScanSuccess, onScanFailure);
    }

    return () => {
      if (scanCooldownTimeoutRef.current) {
        clearTimeout(scanCooldownTimeoutRef.current);
      }
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear().catch(err => {
          console.error("Failed to clear html5QrcodeScanner: ", err);
        });
        html5QrcodeScannerRef.current = null;
      }
    };
  }, []);

  const goToPayment = () => {
    navigate("/payment");
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    const item = items.find(p => p.productId === productId);
    if (item) {
      const newQuantity = item.quantity + delta;
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearAll = () => {
    clearCart();
  };

  const totalQuantity = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      <Header />

      <CartHeader>
        <CartTitle>카메라에 바코드를 스캔해주세요</CartTitle>
        <Button variant="delete" onClick={handleClearAll}>
          상품 전체 삭제
        </Button>
      </CartHeader>

      <CartContainer>
        {/* <div id="qr-reader" style={{ width: '100%', height: '100%' }}></div> */}
        {items.map(product => (
          <ProductWrapper key={product.productId}>
            <ProductItem
              product={product as Product}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          </ProductWrapper>
        ))}
        <Footer totalQuantity={totalQuantity} totalPrice={totalPrice}>
          <Button variant="pay" onClick={goToPayment} disabled={totalQuantity === 0}>결제하기</Button>
        </Footer>
      </CartContainer>
    </>
  );
}