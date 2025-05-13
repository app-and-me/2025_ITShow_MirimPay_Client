// components/Footer.tsx
import React from "react";
import styled from "styled-components";

const breakpoints = {
  sm: "640px",
};

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
  max-width: 430px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.25rem;
  color: #008C0E;
  max-width: 430px;
`;


const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

interface FooterProps {
  totalQuantity: number;
  totalPrice: number;
  children?: React.ReactNode;
}

export default function Footer({ totalQuantity, totalPrice, children }: FooterProps) {
  return (
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
        {children}
      </ButtonWrapper>
    </CartSummary>
  );
}
