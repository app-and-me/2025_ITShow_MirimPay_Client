import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import ProductItem from "../components/ProductItem";
import Footer from "../components/Footer";
import { useCartStore } from "../store/cart";
import { getProductById } from '../utils/api';
import { useEffect, useRef, useState } from 'react';

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

  const isProcessingScanRef = useRef(false);
  const [, setScannedBarcode] = useState<string>('');
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const inputTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScanSuccess = async (barcode: string) => {
      console.log(`Scanned barcode: ${barcode}`);

      if (isProcessingScanRef.current) {
        console.log('Already processing a scan, ignoring...');
        return;
      }

      isProcessingScanRef.current = true;

      try {
        const productDetails = await getProductById(barcode);
        const { items: currentItems, addToCart: currentAddToCart, updateQuantity: currentUpdateQuantity } = useCartStore.getState();
        const existingItem = currentItems.find(item => item.productId === productDetails.id);

        if (existingItem) {
          if (existingItem.quantity < productDetails.quantity) {
            currentUpdateQuantity(productDetails.id, existingItem.quantity + 1);
            console.log(`Added ${productDetails.name} to cart. New quantity: ${existingItem.quantity + 1}`);
          } else {
            console.log(`Maximum stock reached for ${productDetails.name}`);
          }
        } else {
          currentAddToCart(productDetails.id, productDetails.name, productDetails.price, productDetails.quantity);
          console.log(`Added new product ${productDetails.name} to cart`);
        }
      } catch (error) {
        console.error(`Error processing barcode ${barcode}:`, error);
      } finally {
        setTimeout(() => {
          isProcessingScanRef.current = false;
        }, 500);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (barcodeInput.trim().length > 0) {
          setScannedBarcode(barcodeInput.trim());
          onScanSuccess(barcodeInput.trim());
          setBarcodeInput('');
        }
      } else if (event.key.length === 1) {
        setBarcodeInput(prev => prev + event.key);
        
        if (inputTimeoutRef.current) {
          clearTimeout(inputTimeoutRef.current);
        }
        
        inputTimeoutRef.current = setTimeout(() => {
          if (barcodeInput.length > 5) {
            setScannedBarcode(barcodeInput);
            onScanSuccess(barcodeInput);
            setBarcodeInput('');
          }
        }, 100);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (inputTimeoutRef.current) {
        clearTimeout(inputTimeoutRef.current);
      }
    };
  }, [barcodeInput]);

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
        <CartTitle>바코드 리더기로 상품을 스캔해주세요</CartTitle>
        <Button variant="delete" onClick={handleClearAll}>
          상품 전체 삭제
        </Button>
      </CartHeader>

      <CartContainer>
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