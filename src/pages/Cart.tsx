import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import ProductItem from "../components/ProductItem";

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
];

const CartContainer = styled.div`
  padding: 1.5rem;
  padding-bottom: 10rem;
  max-width: 28rem;
  margin: 0 auto;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 1rem 2rem;
`;

const CartTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0; /* margin-bottom 제거 */
  line-height: 40px; /* 버튼 높이에 맞춰 정렬 */
`;

const ProductWrapper = styled.div`
  margin: 0 1rem;
`;

const CartSummary = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 28rem;
  margin: 0 auto;
  background-color: white;
  padding: 1.5rem 1rem 3rem;
  border-top: 1px solid #3A3A3A;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-size: 20px;
  color: #008C0E;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function Cart() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleQuantityChange = (id: number, delta: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
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
    <CartContainer>
      <Header />
      <CartHeader>
        <CartTitle>리더기에 바코드를 찍어 주세요</CartTitle>
        <Button variant="delete" onClick={handleClearAll}>
          상품 전체 삭제
        </Button>
      </CartHeader>

      {products.map(product => (
        <ProductWrapper key={product.id}>
          <ProductItem
            product={product}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </ProductWrapper>
      ))}

      <CartSummary>
        <SummaryRow>
          <span>주문 개수</span>
          <span>{totalQuantity}개</span>
        </SummaryRow>
        <TotalRow>
          <span>총 결제 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </TotalRow>
        <ButtonWrapper>
          <Button variant="pay">결제하기</Button>
        </ButtonWrapper>
      </CartSummary>
    </CartContainer>
  );
}