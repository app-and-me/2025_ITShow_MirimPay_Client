import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import ProductItem from "../components/ProductItem";
import Footer from "../components/Footer";
import GlobalStyle from "../styles/GlobalStyle";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "오리온 도도한 나초 샤워크림어니언", price: 1700, quantity: 1 },
  { id: 2, name: "롤리팝 아이스캔디", price: 700, quantity: 2 },
  { id: 3, name: "오리온 더 탱글 마이구미", price: 1200, quantity: 1 },
  { id: 4, name: "나나콘", price: 1200, quantity: 1 },
  { id: 1, name: "오리온 도도한 나초 샤워크림어니언", price: 1700, quantity: 1 },
  { id: 2, name: "롤리팝 아이스캔디", price: 700, quantity: 2 },
  { id: 3, name: "오리온 더 탱글 마이구미", price: 1200, quantity: 1 },
  { id: 4, name: "나나콘", price: 1200, quantity: 1 },
];

const breakpoints = {
  sm: "640px",
  md: "1024px",
};

const CartContainer = styled.div`
  padding: 9rem 1.5rem 10rem;
  max-width: 100%;
  margin: 0 auto;
  user-select: none;
  overflow-x: hidden;

  @media (min-width: ${breakpoints.sm}) {
    max-width: 28rem;
  }
`;

const ProductWrapper = styled.div`
  margin: 0 1rem;
`;

const CartSummary = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
  padding: 1.5rem 1rem 3rem;
  border-top: 1px solid #3A3A3A;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${breakpoints.sm}) {
    max-width: 28rem;
    margin: 0 auto;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #6b7280;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.25rem;
  color: #008C0E;
`;

const CartHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  overflow-x: hidden;

  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const CartTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  user-select: none;

  @media (min-width: ${breakpoints.sm}) {
    font-size: 1.3rem;
    line-height: 40px;
  }
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

  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 28rem;
    margin: 0 auto;
  }
`;

export default function Cart() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleQuantityChange = (id: number, delta: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id == id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
      )
    );
  };

  const handleRemove = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleClearAll = () => {
    setProducts([]);
  };

  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <>
      <GlobalStyle />
      <Header />
  
      <CartHeader>
        <CartTitle>리더기에 바코드를 찍어 주세요</CartTitle>
        <Button variant="delete" onClick={handleClearAll}>
          상품 전체 삭제
        </Button>
      </CartHeader>
  
      <CartContainer>
        {products.map(product => (
          <ProductWrapper key={product.id}>
            <ProductItem
              product={product}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          </ProductWrapper>
        ))}
        <Footer totalQuantity={totalQuantity} totalPrice={totalPrice} />
      </CartContainer>
      
    </>
  );
}