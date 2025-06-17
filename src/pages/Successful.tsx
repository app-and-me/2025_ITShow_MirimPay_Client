import Shopimg from '../assets/Shop.png';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentContainer = styled.div`
  padding: 1.5rem;
  margin: 0 auto;
  background-color: #008C0E;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SquareBox = styled.div`
  width: 85%;
  height: 80vh;
  background-color: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: space-between;
  padding: 20px;
  
`;

const Circle = styled.div`
  position: absolute;
  top: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #0F9444;
`;

const Title = styled.div`
  text-align: center;
  font-size: 32px;
  color: black;
  font-weight: bold;
  margin-top: 75%;
  line-height: 1.5;
`;

const CountdownText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 32px;
  color: #0F9444;
  font-weight: bold;
  margin-bottom: 10%;
`;

const ShopImg = styled.img`
  margin-left: 8px;
  margin-bottom: -4px;
  width: 90px;
  height: 90px;
`;

export default function Payment() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/main');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  const handleClick = () => {
    navigate('/main');
  };

  return (
    <PaymentContainer onClick={handleClick}>
      <SquareBox>
        <Circle>
          <ShopImg src={Shopimg} alt="shop" />
        </Circle>
        <Title>
          결제가 성공적으로<br />
          완료되었습니다!
        </Title>
        <CountdownText>
          {countdown}초 후에 처음 화면으로 돌아갑니다
        </CountdownText>
        <SubTitle>MIRIM PAY</SubTitle>
      </SquareBox>
    </PaymentContainer>
  );
}