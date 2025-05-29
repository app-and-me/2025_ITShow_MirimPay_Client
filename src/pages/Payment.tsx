import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Button from "../components/Button";
import Footer from "../components/Footer";
import BarcodeIcon from "../components/BarcodeIcon";
import FaceIcon from "../components/FaceIcon";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";

const Main = styled.div`
  padding: 40px 20px;
`;

const Wrapper = styled.div`
  padding: 2rem 2rem;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  user-select: none;
  overflow-x: hidden;
  box-sizing: border-box;
  z-index: 999;
`;

const TitleWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 8px;
  text-align: left;
  user-select: none;
`;

const Subtitle = styled.p`
  color: #454545;
  font-size: 1rem;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const MethodButton = styled.button<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  border: 2px solid ${({ selected }) => (selected ? "#208D4E" : "#ccc")};
  background-color: #fff;
  color: ${({ selected }) => (selected ? "#208D4E" : "#000")};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity, totalPrice } = location.state || { totalQuantity: 0, totalPrice: 0 };

  const [selectedMethod, setSelectedMethod] = useState<'pay' | 'face' | null>('pay');

  const goBack = () => navigate('/');

  const goNext = () => {
    if (selectedMethod === 'pay') {
      navigate('/pay', { state: { totalQuantity, totalPrice } });
    } else if (selectedMethod === 'face') {
      navigate('/face', { state: { totalQuantity, totalPrice } });
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header />

      <Main>
        <Wrapper>
          <TitleWrapper>
            <Title>결제 수단 선택</Title>
            <Subtitle>결제 수단을 선택해 주세요</Subtitle>
          </TitleWrapper>

          <ButtonContainer>
            <MethodButton
              selected={selectedMethod === 'pay'}
              onClick={() => setSelectedMethod('pay')}
            >
              <div style={{ marginBottom: '24px' }}>
                <BarcodeIcon selected={selectedMethod === 'pay'} />
              </div>
              페이
            </MethodButton>

            <MethodButton
              selected={selectedMethod === 'face'}
              onClick={() => setSelectedMethod('face')}
            >
              <div style={{ marginBottom: '24px' }}>
                <FaceIcon selected={selectedMethod === 'face'} />
              </div>
              얼굴 인식
            </MethodButton>
          </ButtonContainer>
        </Wrapper>
      </Main>

      <Footer totalQuantity={totalQuantity} totalPrice={totalPrice}>
        <Button variant="back" onClick={goBack}>이전</Button>
        <Button variant="next" onClick={goNext}>다음</Button>
      </Footer>
    </>
  );
}
